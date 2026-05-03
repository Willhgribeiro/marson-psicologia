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
  inviteCode = signal('');
  patientName = signal('');
  formStarted = signal(false);
  codeValidated = signal(false);
  acceptedTerms = signal(false);
  answers = signal<Record<string, string | string[]>>({});

  readonly questions = this.questionService.questions;

  constructor(
    private questionService: QuestionService,
    private patientService: PatientService,
    private toastService: ToastService,
    public router: Router
  ) {}

  ngOnInit(): void {}

async validateCode(): Promise<void> {
  const code = this.inviteCode().trim().toUpperCase();

  if (!code) {
    this.toastService.show(
      'Digite o código de acesso.',
      'error'
    );
    return;
  }

  const patient = await this.patientService.validateFullCode(code);

  if (!patient) {
    this.toastService.show(
      'Código inválido ou já utilizado.',
      'error'
    );
    return;
  }

  // preenche nome automaticamente
  this.patientName.set(patient.name);

  // mostra tela de confirmação
  this.codeValidated.set(true);

  // garante que checkbox começa desmarcado
  this.acceptedTerms.set(false);

  this.toastService.show(
    'Código válido! Confirme seus dados para continuar.',
    'success'
  );
}

startForm(): void {
  if (!this.patientName().trim()) {
    this.toastService.show(
      'Confirme seu nome para continuar.',
      'error'
    );
    return;
  }

  if (!this.acceptedTerms()) {
    this.toastService.show(
      'Você precisa aceitar os termos para continuar.',
      'error'
    );
    return;
  }

  const init: Record<string, string | string[]> = {};

  this.questions().forEach(q => {
    init[q.id] =
      q.type === 'mc' && q.multiple
        ? []
        : '';
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

  let fullData = {};

  if (this.inviteCode()) {
    const normalizedCode = this.inviteCode().trim().toUpperCase();

    // corrigido: agora getFullPatientByCode é async
    const fullPatient = await this.patientService.getFullPatientByCode(normalizedCode);

    if (fullPatient) {
      fullData = {
        rg: fullPatient.rg,
        cpf: fullPatient.cpf,
        address: fullPatient.address,
        motherName: fullPatient.motherName,
        fatherName: fullPatient.fatherName,
        reason: fullPatient.reason
      };
    }
  }

  // salva respostas primeiro
  await this.patientService.addRecord(
    this.patientName().trim(),
    finalAnswers,
    fullData
  );

  // só marca como usado após finalizar tudo
  if (this.inviteCode()) {
    const normalizedCode = this.inviteCode().trim().toUpperCase();

    await this.patientService.markFullCodeAsUsed(normalizedCode);
  }

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
