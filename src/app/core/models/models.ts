export type QuestionType = 'text' | 'mc';

export interface Question {
  id: string;
  type: QuestionType;
  text: string;
  options?: string[];
  multiple?: boolean;
}

export interface Answer {
  questionId: string;
  question: string;
  type: QuestionType;
  answer: string | string[];
}

export interface PatientRecord {
  id: number;
  name: string;
  date: string;
  time: string;
  answers: Answer[];
}
