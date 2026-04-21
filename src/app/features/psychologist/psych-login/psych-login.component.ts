import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ToastService } from '../../../core/services/toast.service';

const PSYCH_PASSWORD = 'psico123';

@Component({
  selector: 'app-psych-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './psych-login.component.html',
  styleUrls: ['./psych-login.component.scss']
})
export class PsychLoginComponent {
  password = signal('');

  constructor(
    private router: Router,
    private toastService: ToastService
  ) {}

  login(): void {
    if (this.password() === PSYCH_PASSWORD) {
      this.router.navigate(['/psych/panel']);
    } else {
      this.toastService.show('Senha incorreta.', 'error');
      this.password.set('');
    }
  }

  goHome(): void {
    this.router.navigate(['/']);
  }
}
