import { Injectable, signal, computed } from '@angular/core';
import { Question } from '../models/models';

const STORAGE_KEY = 'mp_questions';

const DEFAULT_QUESTIONS: Question[] = [
  { id: 'q1', type: 'text', text: 'Qual é a sua queixa principal? O que te trouxe até aqui?' },
  { id: 'q2', type: 'text', text: 'Há quanto tempo você percebe essas dificuldades?' },
  {
    id: 'q3', type: 'mc',
    text: 'Você tem histórico de alguma condição neurológica ou psiquiátrica?',
    options: ['Sim', 'Não', 'Não sei / Não tenho certeza'], multiple: false
  },
  {
    id: 'q4', type: 'mc',
    text: 'Alguém na sua família tem diagnóstico semelhante?',
    options: ['Sim', 'Não', 'Não sei'], multiple: false
  },
  {
    id: 'q5', type: 'mc',
    text: 'Como você avalia seu sono atualmente?',
    options: ['Durmo bem', 'Dificuldade para dormir', 'Acordo durante a noite', 'Durmo demais', 'Sono irregular'],
    multiple: true
  },
  { id: 'q6', type: 'text', text: 'Você faz uso de algum medicamento? Se sim, qual?' },
  {
    id: 'q7', type: 'mc',
    text: 'Como você avalia sua atenção e concentração no dia a dia?',
    options: ['Ótima', 'Boa', 'Regular', 'Ruim', 'Péssima'], multiple: false
  },
  {
    id: 'q8', type: 'mc',
    text: 'Você tem dificuldades com memória? De que tipo?',
    options: ['Esqueço nomes e rostos', 'Esqueço compromissos', 'Esqueço onde deixei objetos', 'Dificuldade em aprender coisas novas', 'Não tenho dificuldades'],
    multiple: true
  },
  {
    id: 'q9', type: 'mc',
    text: 'Como está seu humor nas últimas semanas?',
    options: ['Muito bem', 'Bem', 'Ansioso(a)', 'Triste / para baixo', 'Irritado(a)', 'Oscilando muito'],
    multiple: true
  },
  { id: 'q10', type: 'text', text: 'Existe algum evento de vida recente que considera relevante informar?' }
];

@Injectable({ providedIn: 'root' })
export class QuestionService {
  private _questions = signal<Question[]>(this.loadFromStorage());

  readonly questions = this._questions.asReadonly();
  readonly count = computed(() => this._questions().length);

  private loadFromStorage(): Question[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : JSON.parse(JSON.stringify(DEFAULT_QUESTIONS));
    } catch {
      return JSON.parse(JSON.stringify(DEFAULT_QUESTIONS));
    }
  }

  private persist(): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this._questions()));
  }

  addQuestion(q: Omit<Question, 'id'>): void {
    const newQ: Question = { ...q, id: `q_${Date.now()}` };
    this._questions.update(list => [...list, newQ]);
    this.persist();
  }

  deleteQuestion(id: string): void {
    this._questions.update(list => list.filter(q => q.id !== id));
    this.persist();
  }

  resetToDefaults(): void {
    this._questions.set(JSON.parse(JSON.stringify(DEFAULT_QUESTIONS)));
    this.persist();
  }
}
