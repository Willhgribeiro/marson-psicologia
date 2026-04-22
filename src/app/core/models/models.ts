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
  id: string;
  name: string;
  date: string;
  time: string;
  answers: Answer[];
  createdAt?: string;
  // Dados do cadastro
  rg?: string;
  cpf?: string;
  address?: string;
  motherName?: string;
  fatherName?: string;
  reason?: string;
}

export interface PatientInvite {
  code: string;
  patientName: string;
  createdAt: string;
  used: boolean;
  usedAt?: string;
  // Campos opcionais para cadastro completo
  rg?: string;
  cpf?: string;
  address?: string;
  motherName?: string;
  fatherName?: string;
  reason?: string;
}

export interface PatientFull {
  code: string;
  name: string;
  rg: string;
  cpf: string;
  address: string;
  motherName: string;
  fatherName: string;
  reason: string;
  createdAt: string;
  used: boolean;
  usedAt?: string;
}
