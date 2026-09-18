
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

export type IconName =
  | 'whatsapp'
  | 'brain'
  | 'chat'
  | 'report'
  | 'phone'
  | 'email'
  | 'instagram'
  | 'lock'
  | 'chevron'
  | 'check'
  | 'check-circle'
  | 'arrow'
  | 'user'
  | 'location'
  | 'clock';

@Component({
    selector: 'app-icon',
    imports: [],
    templateUrl: './icon.component.html',
    styleUrls: ['./icon.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class IconComponent {
  @Input({ required: true }) name!: IconName;
  @Input() size: number = 24;
  @Input() strokeWidth: number = 2;
  @Input() className: string = '';
}
