import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../../core/services/toast.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      class="toast"
      [class.show]="!!toastService.toast()"
      [class.success]="toastService.toast()?.type === 'success'"
      [class.error]="toastService.toast()?.type === 'error'"
      *ngIf="toastService.toast() as t"
    >
      {{ t.message }}
    </div>
  `,
  styles: [`
    .toast {
      position: fixed; bottom: 2rem; right: 2rem;
      background: #1e1e2e; color: #fff;
      padding: .9rem 1.4rem; border-radius: 10px;
      font-size: .88rem; font-family: 'DM Sans', sans-serif;
      box-shadow: 0 8px 24px rgba(0,0,0,.25);
      transform: translateY(100px); opacity: 0;
      transition: all .35s cubic-bezier(.175,.885,.32,1.275);
      z-index: 999; pointer-events: none;
      &.show  { transform: none; opacity: 1; }
      &.success { background: #1a3a5c; }
      &.error   { background: #b85c5c; }
    }
  `]
})
export class ToastComponent {
  constructor(public toastService: ToastService) {}
}
