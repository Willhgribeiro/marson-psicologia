import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patient-success',
  standalone: true,
  template: `
    <div class="layout">
      <div class="success-box">
        <div class="success-icon">✅</div>
        <h2>Anamnese concluída!</h2>
        <p>Suas respostas foram registradas com sucesso.<br>O psicólogo terá acesso às informações.</p>
        <button class="btn btn-primary" (click)="router.navigate(['/'])">Voltar ao início</button>
      </div>
    </div>
  `,
  styles: [`
    @use '../../../styles/shared' as *;
    .layout { max-width: 500px; margin: 4rem auto; padding: 0 1.5rem; }
    .success-box {
      text-align: center; padding: 3rem 2rem; background: #fff;
      border-radius: 18px; border: 1px solid #dde4ed; box-shadow: $shadow;
    }
    .success-icon { font-size: 3.5rem; margin-bottom: 1rem; }
    h2 { font-family: 'DM Serif Display', serif; font-size: 1.6rem; margin-bottom: .6rem; }
    p { color: $muted; font-size: .95rem; margin-bottom: 1.5rem; line-height: 1.6; }
  `]
})
export class PatientSuccessComponent {
  constructor(public router: Router) {}
}
