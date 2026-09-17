import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { ptBR } from '../../core/i18n/pt-br';
import { TranslatePipe } from '../../core/i18n/translate.pipe';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  menuOpen = false;
  t = ptBR.home;

  constructor(private router: Router) {}

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    const clickedInsideMenu = target.closest('.menu-panel');
    const clickedMenuButton = target.closest('.menu-button');

    if (!clickedInsideMenu && !clickedMenuButton && this.menuOpen) {
      this.closeMenu();
    }
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu(): void {
    this.menuOpen = false;
  }

  goPatient(): void {
    this.closeMenu();
    this.router.navigate(['/patient']);
  }

  goPsych(): void {
    this.closeMenu();
    this.router.navigate(['/psych/login']);
  }

  openInstagram(): void {
    window.open('https://www.instagram.com/marsonpsicologia/', '_blank');
  }

  openWhatsApp(): void {
    window.open('https://wa.me/5511954953003', '_blank');
  }
}
