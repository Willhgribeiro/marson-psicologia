import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ContactService } from '../../../../core/services/contact.service';
import { IconComponent } from '../../../../shared/components/icon/icon.component';
import { ptBR } from '../../../../core/i18n/pt-br';

@Component({
    selector: 'app-home-location',
    imports: [CommonModule, IconComponent],
    templateUrl: './home-location.component.html',
    styleUrls: ['./home-location.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeLocationComponent {
  readonly t = ptBR.home.location;

  constructor(readonly contactService: ContactService) {}

  openWhatsApp(): void {
    this.contactService.openWhatsApp(this.t.ctaMessage);
  }
}
