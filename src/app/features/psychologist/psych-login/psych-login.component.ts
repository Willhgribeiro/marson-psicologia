import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgxTurnstileModule } from 'ngx-turnstile';
import { AuthService } from '../../../core/services/auth.service';
import { ToastService } from '../../../core/services/toast.service';

@Component({
  selector: 'app-psych-login',
  standalone: true,
  imports: [FormsModule, CommonModule, NgxTurnstileModule],
  templateUrl: './psych-login.component.html',
  styleUrls: ['./psych-login.component.scss']
})
export class PsychLoginComponent {
  email = signal('');
  password = signal('');
  loading = signal(false);
  failedAttempts = signal(0);
  showCaptcha = signal(false);
  captchaToken = signal('');

  constructor(
    private router: Router,
    private authService: AuthService,
    private toastService: ToastService
  ) { }

  async login(): Promise<void> {
    const email = this.email().trim();
    const password = this.password();

    if (!email || !password) {
      this.toastService.show('Preencha email e senha.', 'error');
      return;
    }

    if (this.showCaptcha() && !this.captchaToken()) {
      this.toastService.show('Confirme o captcha.', 'error');
      return;
    }

    this.loading.set(true);

    try {
      await this.authService.login(email, password);

      this.failedAttempts.set(0);
      this.showCaptcha.set(false);
      this.captchaToken.set('');

      this.toastService.show('Login realizado com sucesso!', 'success');
    } catch (error: any) {
      const attempts = this.failedAttempts() + 1;
      this.failedAttempts.set(attempts);

      if (attempts >= 3) {
        this.showCaptcha.set(true);
      }

      this.toastService.show(error.message, 'error');
    } finally {
      this.loading.set(false);
    }
  }

onCaptchaSuccess(token: any): void {
  this.captchaToken.set(token as string);
}
  goHome(): void {
    this.router.navigate(['/']);
  }
}
