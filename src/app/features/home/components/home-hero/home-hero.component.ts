import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { ptBR } from '../../../../core/i18n/pt-br';
import { TranslatePipe } from '../../../../core/i18n/translate.pipe';
import { IconComponent } from '../../../../shared/components/icon/icon.component';

@Component({
    selector: 'app-home-hero',
    imports: [CommonModule, TranslatePipe, IconComponent],
    templateUrl: './home-hero.component.html',
    styleUrls: ['./home-hero.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeHeroComponent {
  @Output() contactClick = new EventEmitter<void>();
  @Output() exploreClick = new EventEmitter<void>();

  t = ptBR.home;

  onContact(): void {
    this.contactClick.emit();
  }

  onExplore(): void {
    this.exploreClick.emit();
  }
}
