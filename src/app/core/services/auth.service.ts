import { Injectable, signal } from '@angular/core';
import { Auth, signInWithEmailAndPassword, signOut, user, User } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  currentUser = signal<User | null>(null);
  loading = signal(true);

  constructor(private auth: Auth, private router: Router) {
    // Listen to auth state changes
    this.auth.onAuthStateChanged((user) => {
      this.currentUser.set(user);
      this.loading.set(false);
    });
  }

  async login(email: string, password: string): Promise<void> {
    try {
      await signInWithEmailAndPassword(this.auth, email, password);
      this.router.navigate(['/psych/panel']);
    } catch (error: any) {
      throw new Error(this.getErrorMessage(error.code));
    }
  }

  async logout(): Promise<void> {
    await signOut(this.auth);
    this.router.navigate(['/psych/login']);
  }

  isLoggedIn(): boolean {
    return this.currentUser() !== null;
  }

private getErrorMessage(code: string): string {
  switch (code) {
    case 'auth/invalid-email':
      return 'Credenciais inválidas.';
      
    case 'auth/user-disabled':
      return 'Conta desativada.';
      
    case 'auth/user-not-found':
    case 'auth/wrong-password':
    case 'auth/invalid-credential':
      return 'Credenciais inválidas.';
      
    case 'auth/too-many-requests':
      return 'Muitas tentativas de login. Tente novamente mais tarde.';
      
    default:
      return 'Erro ao fazer login. Tente novamente.';
  }
}
}