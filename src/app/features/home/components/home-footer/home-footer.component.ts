
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '../../../../core/i18n/translate.pipe';
import { PRIVACY_POLICY_ROUTE } from '../../../../core/legal/legal.constants';

@Component({
    selector: 'app-home-footer',
    imports: [TranslatePipe, RouterLink],
    templateUrl: './home-footer.component.html',
    styleUrls: ['./home-footer.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeFooterComponent {
  protected readonly privacyRoute = PRIVACY_POLICY_ROUTE;
}
