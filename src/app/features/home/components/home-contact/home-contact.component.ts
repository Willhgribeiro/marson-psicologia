import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ContactService } from '../../../../core/services/contact.service';
import { TranslatePipe } from '../../../../core/i18n/translate.pipe';
import { IconComponent } from '../../../../shared/components/icon/icon.component';

@Component({
    selector: 'app-home-contact',
    imports: [CommonModule, TranslatePipe, IconComponent],
    templateUrl: './home-contact.component.html',
    styleUrls: ['./home-contact.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeContactComponent {
  constructor(public contactService: ContactService) {}
}
