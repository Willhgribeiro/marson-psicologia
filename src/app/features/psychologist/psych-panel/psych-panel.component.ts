import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { QuestionService } from '../../../core/services/question.service';
import { PatientService } from '../../../core/services/patient.service';
import { ToastService } from '../../../core/services/toast.service';
import { Question, QuestionType } from '../../../core/models/models';

@Component({
  selector: 'app-psych-panel',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './psych-panel.component.html',
  styleUrls: ['./psych-panel.component.scss']
})
export class PsychPanelComponent {
  activeTab = signal<'questions' | 'patients'>('questions');

  // new question form state
  newQType = signal<QuestionType>('text');
  newQText = signal('');
  newQOptions = signal<string[]>(['', '']);
  newQMultiple = signal(false);

  readonly questions = this.questionService.questions;
  readonly patients  = this.patientService.patients;

  constructor(
    public router: Router,
    private questionService: QuestionService,
    private patientService: PatientService,
    private toastService: ToastService
  ) {}

  setTab(tab: 'questions' | 'patients'): void {
    this.activeTab.set(tab);
  }

  setType(t: QuestionType): void {
    this.newQType.set(t);
    if (t === 'mc' && this.newQOptions().length < 2) {
      this.newQOptions.set(['', '']);
    }
  }

  updateOption(index: number, value: string): void {
    this.newQOptions.update(opts => {
      const copy = [...opts];
      copy[index] = value;
      return copy;
    });
  }

  addOption(): void {
    this.newQOptions.update(opts => [...opts, '']);
  }

  removeOption(index: number): void {
    if (this.newQOptions().length <= 2) {
      this.toastService.show('Mínimo de 2 opções.', 'error');
      return;
    }
    this.newQOptions.update(opts => opts.filter((_, i) => i !== index));
  }

  addQuestion(): void {
    const text = this.newQText().trim();
    if (!text) { this.toastService.show('Digite o texto da pergunta.', 'error'); return; }

    if (this.newQType() === 'mc') {
      const opts = this.newQOptions().map(o => o.trim()).filter(Boolean);
      if (opts.length < 2) { this.toastService.show('Adicione pelo menos 2 opções.', 'error'); return; }
      this.questionService.addQuestion({ type: 'mc', text, options: opts, multiple: this.newQMultiple() });
    } else {
      this.questionService.addQuestion({ type: 'text', text });
    }

    // reset form
    this.newQText.set('');
    this.newQOptions.set(['', '']);
    this.newQMultiple.set(false);
    this.newQType.set('text');
    this.toastService.show('Pergunta adicionada!', 'success');
  }

  deleteQuestion(id: string): void {
    if (!confirm('Excluir esta pergunta?')) return;
    this.questionService.deleteQuestion(id);
    this.toastService.show('Pergunta removida.');
  }

  openPatient(id: number): void {
    this.router.navigate(['/psych/patient', id]);
  }

  answeredCount(answers: any[]): number {
    return answers.filter(a => a.answer && a.answer.length).length;
  }

  goHome(): void { this.router.navigate(['/']); }
}
