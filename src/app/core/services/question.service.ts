import { Injectable, signal, computed } from '@angular/core';
import { Firestore, collection, doc, addDoc, deleteDoc, onSnapshot, query, orderBy } from '@angular/fire/firestore';
import { Question } from '../models/models';

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
  const questionsQuery = query(
    questionsRef,
    orderBy('order', 'asc')
  );

  this.unsubscribe = onSnapshot(
    questionsQuery,
    (snapshot) => {
      console.log('snapshot empty?', snapshot.empty);
      console.log('docs:', snapshot.docs);

      const questions = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Question[];

      console.log('questions final:', questions);

      this._questions.set(questions);
    }
  );
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
