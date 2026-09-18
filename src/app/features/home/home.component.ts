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
  portalMenuOpen = false;
  openFaqIndex: number | null = 0;
  t = ptBR.home;

  constructor(private router: Router) {}

  toggleFaq(index: number): void {
    this.openFaqIndex = this.openFaqIndex === index ? null : index;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    const clickedInsideMenu = target.closest('.menu-panel') || target.closest('.portal-dropdown');
    const clickedMenuButton = target.closest('.menu-button') || target.closest('.portal-toggle');

    if (!clickedInsideMenu && !clickedMenuButton) {
      this.closeMenu();
      this.portalMenuOpen = false;
    }
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  togglePortalMenu(): void {
    this.portalMenuOpen = !this.portalMenuOpen;
  }

  closeMenu(): void {
    this.menuOpen = false;
  }

  goPatient(): void {
    this.closeMenu();
    this.portalMenuOpen = false;
    this.router.navigate(['/patient']);
  }

  goPsych(): void {
    this.closeMenu();
    this.portalMenuOpen = false;
    this.router.navigate(['/psych/login']);
  }

  openInstagram(): void {
    window.open('https://www.instagram.com/marsonpsicologia/', '_blank');
  }

  openWhatsApp(): void {
    const message = encodeURIComponent('Olá! Gostaria de obter informações sobre atendimento psicológico e avaliação neuropsicológica.');
    window.open(`https://wa.me/5511954953003?text=${message}`, '_blank');
  }

  scrollToSection(sectionId: string): void {
    this.closeMenu();
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
