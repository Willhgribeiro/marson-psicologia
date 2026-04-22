import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';
import { ToastService } from '../../../core/services/toast.service';

@Component({
  selector: 'app-psych-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './psych-login.component.html',
  styleUrls: ['./psych-login.component.scss']
})
export class PsychLoginComponent {
  email = signal('');
  password = signal('');
  loading = signal(false);

  constructor(
    private router: Router,
    private authService: AuthService,
    private toastService: ToastService
  ) {}

  async login(): Promise<void> {
    const email = this.email().trim();
    const password = this.password();

    if (!email || !password) {
      this.toastService.show('Preencha email e senha.', 'error');
      return;
    }

    this.loading.set(true);
    try {
      await this.authService.login(email, password);
      this.toastService.show('Login realizado com sucesso!', 'success');
    } catch (error: any) {
      this.toastService.show(error.message, 'error');
    } finally {
      this.loading.set(false);
    }
  }

  goHome(): void {
    this.router.navigate(['/']);
  }
}
