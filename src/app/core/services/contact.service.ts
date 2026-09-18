import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  readonly phoneNumber = '5511954953003';
  readonly displayPhoneNumber = '(11) 95495-3003';
  readonly instagramHandle = '@marsonpsicologia';
  readonly instagramUrl = 'https://www.instagram.com/marsonpsicologia/';
  readonly emailAddress = 'diegomarsonpsi@outlook.com';
  readonly defaultMessage = 'Olá! Acessei o seu site e gostaria de obter informações sobre atendimento psicológico e avaliação neuropsicológica.';

  getWhatsAppUrl(customMessage?: string): string {
    let message = customMessage?.trim() || this.defaultMessage;
    // Rastreabilidade de canal: assegura que a mensagem sinalize que o lead conheceu o profissional através do site
    if (!message.toLowerCase().includes('site')) {
      message = `Olá! Acessei o seu site. ${message}`;
    }
    const text = encodeURIComponent(message);
    return `https://wa.me/${this.phoneNumber}?text=${text}`;
  }

  getTelUrl(): string {
    return `tel:+${this.phoneNumber}`;
  }

  getMailtoUrl(): string {
    return `mailto:${this.emailAddress}`;
  }

  openWhatsApp(customMessage?: string): void {
    window.open(this.getWhatsAppUrl(customMessage), '_blank', 'noopener,noreferrer');
  }

  openInstagram(): void {
    window.open(this.instagramUrl, '_blank', 'noopener,noreferrer');
  }
}
