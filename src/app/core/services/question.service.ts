import { Injectable, signal, computed } from '@angular/core';
import { Firestore, collection, doc, addDoc, updateDoc, deleteDoc, onSnapshot, query, orderBy } from '@angular/fire/firestore';
import { Question, QuestionType } from '../models/models';

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
  private _questions = signal<Question[]>([]);
  private unsubscribe: (() => void) | null = null;

  readonly questions = this._questions.asReadonly();
  readonly count = computed(() => this._questions().length);

  constructor(private firestore: Firestore) {
    this.initRealtimeListener();
  }

  private initRealtimeListener(): void {
    const questionsRef = collection(this.firestore, 'questions');
    const questionsQuery = query(questionsRef, orderBy('order', 'asc'));
    
    this.unsubscribe = onSnapshot(questionsQuery, (snapshot) => {
      if (snapshot.empty) {
        // First time - seed default questions
        this.seedDefaultQuestions();
      } else {
        const questions = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Question[];
        this._questions.set(questions);
      }
    });
  }

  private async seedDefaultQuestions(): Promise<void> {
    const questionsRef = collection(this.firestore, 'questions');
    for (let i = 0; i < DEFAULT_QUESTIONS.length; i++) {
      await addDoc(questionsRef, {
        ...DEFAULT_QUESTIONS[i],
        order: i
      });
    }
  }

  async addQuestion(question: Omit<Question, 'id'>): Promise<void> {
    const questionsRef = collection(this.firestore, 'questions');
    await addDoc(questionsRef, {
      ...question,
      order: this._questions().length
    });
  }

  async deleteQuestion(id: string): Promise<void> {
    const docRef = doc(this.firestore, 'questions', id);
    await deleteDoc(docRef);
  }

  ngOnDestroy(): void {
    if (this.unsubscribe) this.unsubscribe();
  }
}
