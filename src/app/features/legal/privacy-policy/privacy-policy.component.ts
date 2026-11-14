import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import {
  DATA_CONTROLLER,
  PRIVACY_POLICY_UPDATED_AT,
  PRIVACY_POLICY_VERSION
} from '../../../core/legal/legal.constants';

@Component({
  selector: 'app-privacy-policy',
  imports: [RouterLink],
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PrivacyPolicyComponent {
  protected readonly controller = DATA_CONTROLLER;
  protected readonly version = PRIVACY_POLICY_VERSION;
  protected readonly updatedAt = PRIVACY_POLICY_UPDATED_AT;

  constructor() {
    // Title/Meta funcionam no SSR: as tags saem no HTML pré-renderizado (bom para SEO).
    inject(Title).setTitle('Política de Privacidade | Marson Psicologia');
    inject(Meta).updateTag({
      name: 'description',
      content: 'Como a Marson Psicologia coleta, utiliza e protege seus dados pessoais, em conformidade com a LGPD.'
    });
  }
}
