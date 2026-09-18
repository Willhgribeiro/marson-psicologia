
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ptBR } from '../../../../core/i18n/pt-br';
import { TranslatePipe } from '../../../../core/i18n/translate.pipe';
import { IconComponent } from '../../../../shared/components/icon/icon.component';
import { FaqItem } from '../../../../core/models/home.model';

@Component({
    selector: 'app-home-faq',
    imports: [TranslatePipe, IconComponent],
    templateUrl: './home-faq.component.html',
    styleUrls: ['./home-faq.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeFaqComponent {
  t = ptBR.home;
  openFaqIndex: number | null = 0;

  faqItems: FaqItem[] = this.t.faq.items.map((item, idx) => ({
    id: `faq-${idx}`,
    question: item.q,
    answer: item.a
  }));

  toggleFaq(index: number): void {
    this.openFaqIndex = this.openFaqIndex === index ? null : index;
  }
}
