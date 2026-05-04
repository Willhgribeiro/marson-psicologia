import { Component, signal, computed, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { QuestionService } from '../../../core/services/question.service';
import { PatientService } from '../../../core/services/patient.service';
import { ToastService } from '../../../core/services/toast.service';
import { Answer, Question, PatientFull } from '../../../core/models/models';

@Component({
  selector: 'app-patient-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './patient-form.component.html',
  styleUrls: ['./patient-form.component.scss']
})
export class PatientFormComponent implements OnInit {
  inviteCode = signal('');
  patientName = signal('');

  // Dados obrigatórios e opcionais
  education = signal('');
  birthDate = signal('');
  isMinor = signal(false);
  motherName = signal('');
  fatherName = signal('');
  guardianName = signal('');
  doctorName = signal('');
  doctorCrm = signal('');
  doctorSpecialty = signal('');
  diagnosticHypothesis = signal('');
  address = signal('');
  reason = signal('');

  formStarted = signal(false);
  codeValidated = signal(false);
  acceptedTerms = signal(false);
  answers = signal<Record<string, string | string[]>>({});

  readonly questions = this.questionService.questions;

  // Lógica de validação do botão
  isFormInvalid = computed(() => {
    const basicFields = !this.patientName().trim() || !this.education() || !this.birthDate() || !this.acceptedTerms();
    const guardianField = this.isMinor() && !this.guardianName().trim();
    return basicFields || guardianField;
  });

  constructor(
    private questionService: QuestionService,
    private patientService: PatientService,
    private toastService: ToastService,
    public router: Router
  ) { }

  ngOnInit(): void { }

  goBack(): void {
    if (this.formStarted()) {
      this.formStarted.set(false);
    } else if (this.codeValidated()) {
      this.codeValidated.set(false);
      this.patientName.set('');
      this.inviteCode.set('');
    } else {
      this.router.navigate(['/']);
    }
  }

  async validateCode(): Promise<void> {
    const code = this.inviteCode().trim().toUpperCase();
    if (!code) {
      this.toastService.show('Digite o código de acesso.', 'error');
      return;
    }

    const patient = await this.patientService.validateFullCode(code);
    if (!patient) {
      this.toastService.show('Código inválido ou já utilizado.', 'error');
      return;
    }

    // Preenche dados do convite
    this.patientName.set(patient.name);
    this.education.set(patient.education || '');
    this.birthDate.set(patient.birthDate || '');
    this.isMinor.set(patient.isMinor || false);
    this.guardianName.set(patient.guardianName || '');
    this.address.set(patient.address || '');
    this.motherName.set(patient.motherName || '');
    this.fatherName.set(patient.fatherName || '');
    this.reason.set(patient.reason || '');

    this.codeValidated.set(true);
    this.acceptedTerms.set(false);
    this.toastService.show('Código válido! Verifique seus dados.', 'success');
  }

  startForm(): void {
    if (this.isFormInvalid()) {
      this.toastService.show('Preencha os campos obrigatórios.', 'error');
      return;
    }

    const init: Record<string, string | string[]> = {};
    this.questions().forEach(q => {
      init[q.id] = q.type === 'mc' && q.multiple ? [] : '';
    });

    this.answers.set(init);
    this.formStarted.set(true);
  }

  // --- MÉTODOS AUXILIARES DAS PERGUNTAS (RESTAURADOS) ---

  getTextAnswer(qId: string): string {
    return (this.answers()[qId] as string) ?? '';
  }

  setTextAnswer(qId: string, value: string): void {
    this.answers.update(a => ({ ...a, [qId]: value }));
  }

  isOptionSelected(qId: string, opt: string): boolean {
    const val = this.answers()[qId];
    if (Array.isArray(val)) return val.includes(opt);
    return val === opt;
  }

  toggleOption(q: Question, opt: string): void {
    this.answers.update(current => {
      const copy = { ...current };
      if (q.multiple) {
        const arr = [...((copy[q.id] as string[]) ?? [])];
        const idx = arr.indexOf(opt);
        idx >= 0 ? arr.splice(idx, 1) : arr.push(opt);
        copy[q.id] = arr;
      } else {
        copy[q.id] = opt;
      }
      return copy;
    });
  }

  // -----------------------------------------------------

  async submit(): Promise<void> {
    const ansMap = this.answers();
    const finalAnswers: Answer[] = this.questions().map(q => ({
      questionId: q.id,
      question: q.text,
      type: q.type,
      answer: ansMap[q.id] ?? ''
    }));

    const fullData: Partial<PatientFull> = {
      education: this.education(),
      birthDate: this.birthDate(),
      isMinor: this.isMinor(),
      address: this.address(),
      motherName: this.motherName(),
      fatherName: this.fatherName(),
      guardianName: this.guardianName(),
      doctorName: this.doctorName(),
      doctorCrm: this.doctorCrm(),
      doctorSpecialty: this.doctorSpecialty(),
      diagnosticHypothesis: this.diagnosticHypothesis(),
      reason: this.reason()
    };

    await this.patientService.addRecord(
      this.patientName().trim(),
      finalAnswers,
      fullData
    );

    if (this.inviteCode()) {
      await this.patientService.markFullCodeAsUsed(this.inviteCode().trim().toUpperCase());
    }

    this.router.navigate(['/patient/success']);
  }
}