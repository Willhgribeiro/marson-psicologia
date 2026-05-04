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
  type: 'mc' | 'text';
  answer: string | string[];
}

export interface PatientRecord {
  id: string;
  name: string;
  education: string;           // Obrigatório
  birthDate: string;           // Obrigatório
  isMinor: boolean;            // Define se requer responsável
  guardianName?: string;       // Nome do Responsável/Tutor
  address: string;
  motherName?: string;         // Opcional (legado)
  fatherName?: string;         // Opcional (legado)
  reason: string;
  answers: Answer[];
  date: string;
  time: string;
  createdAt: string;
  doctorName?: string;         // Dados médicos opcionais
  doctorCrm?: string;
  doctorSpecialty?: string;
  diagnosticHypothesis?: string;
}

export interface PatientInvite {
  code: string;
  patientName: string;
  education: string;
  birthDate: string;
  isMinor: boolean;
  guardianName?: string;
  address: string;
  motherName?: string;
  fatherName?: string;
  reason: string;
  createdAt: string;
  used: boolean;
  usedAt?: string;
}


export interface PatientFull {
  code: string;
  name: string;
  education: string;           // Adicionado (Obrigatório)
  birthDate: string;           // Adicionado (Obrigatório)
  isMinor: boolean;            // Adicionado
  address: string;
  motherName: string;
  fatherName: string;
  guardianName?: string;       // Adicionado
  doctorName?: string;         // Adicionado
  doctorCrm?: string;          // Adicionado
  doctorSpecialty?: string;    // Adicionado
  diagnosticHypothesis?: string; // Adicionado
  reason: string;
  createdAt: string;
  used: boolean;
  usedAt?: string;
}

export interface PatientFull extends Omit<PatientInvite, 'patientName'> {
  name: string; 
}