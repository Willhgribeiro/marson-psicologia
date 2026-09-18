export interface SpecialtyItem {
  id: string;
  title: string;
  badge: string;
  text: string;
  icon: 'brain' | 'chat' | 'report';
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface ProfessionalProfile {
  title: string;
  role: string;
  crp: string;
  audienceTag: string;
  items: string[];
}
