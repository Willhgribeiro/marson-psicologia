import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ContactService } from '../../../core/services/contact.service';
import { IconComponent } from '../icon/icon.component';
import { TranslatePipe } from '../../../core/i18n/translate.pipe';

@Component({
  selector: 'app-whatsapp-fab',
  standalone: true,
  imports: [CommonModule, IconComponent, TranslatePipe],
  templateUrl: './whatsapp-fab.component.html',
  styleUrls: ['./whatsapp-fab.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WhatsappFabComponent {
  constructor(private contactService: ContactService) {}

  openWhatsApp(): void {
    this.contactService.openWhatsApp();
  }
}
