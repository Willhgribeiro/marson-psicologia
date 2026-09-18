
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslatePipe } from '../../../../core/i18n/translate.pipe';

@Component({
    selector: 'app-home-footer',
    imports: [TranslatePipe],
    templateUrl: './home-footer.component.html',
    styleUrls: ['./home-footer.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeFooterComponent {}
