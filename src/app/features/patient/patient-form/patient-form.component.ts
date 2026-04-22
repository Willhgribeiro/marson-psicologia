import { Component, signal, computed, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { QuestionService } from '../../../core/services/question.service';
import { PatientService } from '../../../core/services/patient.service';
import { ToastService } from '../../../core/services/toast.service';
import { Answer, Question } from '../../../core/models/models';

@Component({
  selector: 'app-patient-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './patient-form.component.html',
  styleUrls: ['./patient-form.component.scss']
})
export class PatientFormComponent implements OnInit {
  patientName = signal('');
  inviteCode = signal('');
  codeValidated = signal(false);
  formStarted = signal(false);
  answers = signal<Record<string, string | string[]>>({});

  readonly questions = this.questionService.questions;

  constructor(
    private questionService: QuestionService,
    private patientService: PatientService,
    private toastService: ToastService,
    public router: Router
  ) {}

  ngOnInit(): void {}

  validateCode(): void {
    const code = this.inviteCode().trim().toUpperCase();
    if (!code) {
      this.toastService.show('Digite o código de acesso.', 'error');
      return;
    }
    const patient = this.patientService.validateFullCode(code);
    if (!patient) {
      this.toastService.show('Código inválido ou já utilizado.', 'error');
      return;
    }
    this.patientName.set(patient.name);
    this.codeValidated.set(true);
    this.toastService.show('Código válido! Agora preencha seus dados.', 'success');
  }

  startForm(): void {
    if (!this.patientName().trim()) {
      this.toastService.show('Digite seu nome para continuar.', 'error');
      return;
    }
    // initialise answers map
    const init: Record<string, string | string[]> = {};
    this.questions().forEach(q => {
      init[q.id] = q.type === 'mc' && q.multiple ? [] : '';
    });
    this.answers.set(init);
    this.formStarted.set(true);
  }

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

  async submit(): Promise<void> {
    const ansMap = this.answers();
    const finalAnswers: Answer[] = this.questions().map(q => ({
      questionId: q.id,
      question: q.text,
      type: q.type,
      answer: ansMap[q.id] ?? ''
    }));

    // Get full patient data if available
    let fullData = {};
    if (this.inviteCode()) {
      const fullPatient = this.patientService.getFullPatientByCode(this.inviteCode().trim().toUpperCase());
      if (fullPatient) {
        fullData = {
          rg: fullPatient.rg,
          cpf: fullPatient.cpf,
          address: fullPatient.address,
          motherName: fullPatient.motherName,
          fatherName: fullPatient.fatherName,
          reason: fullPatient.reason
        };
        await this.patientService.markFullCodeAsUsed(this.inviteCode().trim().toUpperCase());
      }
    }

    await this.patientService.addRecord(this.patientName().trim(), finalAnswers, fullData);
    
    this.router.navigate(['/patient/success']);
  }

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
}
