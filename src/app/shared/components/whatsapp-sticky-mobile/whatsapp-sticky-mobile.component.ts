import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ContactService } from '../../../core/services/contact.service';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'app-whatsapp-sticky-mobile',
  standalone: true,
  imports: [IconComponent],
  templateUrl: './whatsapp-sticky-mobile.component.html',
  styleUrls: ['./whatsapp-sticky-mobile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WhatsappStickyMobileComponent {
  constructor(readonly contactService: ContactService) {}

  openWhatsApp(): void {
    this.contactService.openWhatsApp('Olá! Acessei o seu site e gostaria de agendar uma consulta.');
  }
}

