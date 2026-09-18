import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslatePipe } from '../../../../core/i18n/translate.pipe';

@Component({
  selector: 'app-home-footer',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  templateUrl: './home-footer.component.html',
  styleUrls: ['./home-footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeFooterComponent {}
