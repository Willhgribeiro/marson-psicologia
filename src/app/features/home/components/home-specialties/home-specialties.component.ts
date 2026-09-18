import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { ptBR } from '../../../../core/i18n/pt-br';
import { TranslatePipe } from '../../../../core/i18n/translate.pipe';
import { IconComponent } from '../../../../shared/components/icon/icon.component';
import { SpecialtyItem } from '../../../../core/models/home.model';

@Component({
    selector: 'app-home-specialties',
    imports: [CommonModule, TranslatePipe, IconComponent],
    templateUrl: './home-specialties.component.html',
    styleUrls: ['./home-specialties.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeSpecialtiesComponent {
  @Output() itemClick = new EventEmitter<SpecialtyItem | null>();

  t = ptBR.home;

  specialties: SpecialtyItem[] = [
    {
      id: 'neuro',
      title: this.t.specialties.cards[0].title,
      badge: this.t.specialties.cards[0].badge,
      text: this.t.specialties.cards[0].text,
      icon: 'brain'
    },
    {
      id: 'therapy',
      title: this.t.specialties.cards[1].title,
      badge: this.t.specialties.cards[1].badge,
      text: this.t.specialties.cards[1].text,
      icon: 'chat'
    },
    {
      id: 'report',
      title: this.t.specialties.cards[2].title,
      badge: this.t.specialties.cards[2].badge,
      text: this.t.specialties.cards[2].text,
      icon: 'report'
    }
  ];

  onSelect(specialty: SpecialtyItem): void {
    this.itemClick.emit(specialty);
  }
}
