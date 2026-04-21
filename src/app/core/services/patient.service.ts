import { Injectable, signal, computed } from '@angular/core';
import { PatientRecord, Answer } from '../models/models';

const STORAGE_KEY = 'mp_patients';

// ── Mock data so the app is testable immediately ──
const MOCK_PATIENTS: PatientRecord[] = [
  {
    id: 1700000001,
    name: 'Ana Beatriz Souza',
    date: '10/04/2026',
    time: '09:15',
    answers: [
      { questionId: 'q1', question: 'Qual é a sua queixa principal? O que te trouxe até aqui?', type: 'text', answer: 'Tenho dificuldade de concentração no trabalho e esqueço compromissos com frequência.' },
      { questionId: 'q2', question: 'Há quanto tempo você percebe essas dificuldades?', type: 'text', answer: 'Aproximadamente 8 meses.' },
      { questionId: 'q3', question: 'Você tem histórico de alguma condição neurológica ou psiquiátrica?', type: 'mc', answer: 'Não' },
      { questionId: 'q4', question: 'Alguém na sua família tem diagnóstico semelhante?', type: 'mc', answer: 'Sim' },
      { questionId: 'q5', question: 'Como você avalia seu sono atualmente?', type: 'mc', answer: ['Dificuldade para dormir', 'Acordo durante a noite'] },
      { questionId: 'q6', question: 'Você faz uso de algum medicamento? Se sim, qual?', type: 'text', answer: 'Não uso nenhum medicamento no momento.' },
      { questionId: 'q7', question: 'Como você avalia sua atenção e concentração no dia a dia?', type: 'mc', answer: 'Ruim' },
      { questionId: 'q8', question: 'Você tem dificuldades com memória? De que tipo?', type: 'mc', answer: ['Esqueço compromissos', 'Esqueço onde deixei objetos'] },
      { questionId: 'q9', question: 'Como está seu humor nas últimas semanas?', type: 'mc', answer: ['Ansioso(a)', 'Oscilando muito'] },
      { questionId: 'q10', question: 'Existe algum evento de vida recente que considera relevante informar?', type: 'text', answer: 'Mudei de emprego há cerca de um ano e o nível de estresse aumentou bastante.' }
    ]
  },
  {
    id: 1700000002,
    name: 'Carlos Eduardo Lima',
    date: '14/04/2026',
    time: '14:30',
    answers: [
      { questionId: 'q1', question: 'Qual é a sua queixa principal? O que te trouxe até aqui?', type: 'text', answer: 'Dores de cabeça frequentes e sensação de "névoa mental".' },
      { questionId: 'q2', question: 'Há quanto tempo você percebe essas dificuldades?', type: 'text', answer: 'Cerca de 3 meses.' },
      { questionId: 'q3', question: 'Você tem histórico de alguma condição neurológica ou psiquiátrica?', type: 'mc', answer: 'Sim' },
      { questionId: 'q4', question: 'Alguém na sua família tem diagnóstico semelhante?', type: 'mc', answer: 'Não sei' },
      { questionId: 'q5', question: 'Como você avalia seu sono atualmente?', type: 'mc', answer: ['Durmo demais'] },
      { questionId: 'q6', question: 'Você faz uso de algum medicamento? Se sim, qual?', type: 'text', answer: 'Uso Escitalopram 10mg há 2 anos.' },
      { questionId: 'q7', question: 'Como você avalia sua atenção e concentração no dia a dia?', type: 'mc', answer: 'Regular' },
      { questionId: 'q8', question: 'Você tem dificuldades com memória? De que tipo?', type: 'mc', answer: ['Esqueço nomes e rostos', 'Dificuldade em aprender coisas novas'] },
      { questionId: 'q9', question: 'Como está seu humor nas últimas semanas?', type: 'mc', answer: ['Triste / para baixo'] },
      { questionId: 'q10', question: 'Existe algum evento de vida recente que considera relevante informar?', type: 'text', answer: '' }
    ]
  },
  {
    id: 1700000003,
    name: 'Fernanda Oliveira',
    date: '18/04/2026',
    time: '11:00',
    answers: [
      { questionId: 'q1', question: 'Qual é a sua queixa principal? O que te trouxe até aqui?', type: 'text', answer: 'Minha filha tem 7 anos e a professora relatou dificuldades de aprendizagem na escola.' },
      { questionId: 'q2', question: 'Há quanto tempo você percebe essas dificuldades?', type: 'text', answer: 'Desde o início do ano letivo.' },
      { questionId: 'q3', question: 'Você tem histórico de alguma condição neurológica ou psiquiátrica?', type: 'mc', answer: 'Não sei / Não tenho certeza' },
      { questionId: 'q4', question: 'Alguém na sua família tem diagnóstico semelhante?', type: 'mc', answer: 'Sim' },
      { questionId: 'q5', question: 'Como você avalia seu sono atualmente?', type: 'mc', answer: ['Durmo bem'] },
      { questionId: 'q6', question: 'Você faz uso de algum medicamento? Se sim, qual?', type: 'text', answer: 'Não.' },
      { questionId: 'q7', question: 'Como você avalia sua atenção e concentração no dia a dia?', type: 'mc', answer: 'Boa' },
      { questionId: 'q8', question: 'Você tem dificuldades com memória? De que tipo?', type: 'mc', answer: ['Não tenho dificuldades'] },
      { questionId: 'q9', question: 'Como está seu humor nas últimas semanas?', type: 'mc', answer: ['Bem'] },
      { questionId: 'q10', question: 'Existe algum evento de vida recente que considera relevante informar?', type: 'text', answer: 'Separação dos pais ocorreu no início do ano, pode ser um fator relevante.' }
    ]
  }
];

@Injectable({ providedIn: 'root' })
export class PatientService {
  private _patients = signal<PatientRecord[]>(this.loadFromStorage());

  readonly patients = this._patients.asReadonly();
  readonly count = computed(() => this._patients().length);

  private loadFromStorage(): PatientRecord[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) return JSON.parse(raw);
      // seed mock data on first load
      localStorage.setItem(STORAGE_KEY, JSON.stringify(MOCK_PATIENTS));
      return MOCK_PATIENTS;
    } catch {
      return MOCK_PATIENTS;
    }
  }

  private persist(): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this._patients()));
  }

  getById(id: number): PatientRecord | undefined {
    return this._patients().find(p => p.id === id);
  }

  addRecord(name: string, answers: Answer[]): PatientRecord {
    const now = new Date();
    const record: PatientRecord = {
      id: Date.now(),
      name,
      date: now.toLocaleDateString('pt-BR'),
      time: now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      answers
    };
    this._patients.update(list => [record, ...list]);
    this.persist();
    return record;
  }

  deleteRecord(id: number): void {
    this._patients.update(list => list.filter(p => p.id !== id));
    this.persist();
  }
}
