import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ClickOutsideDirective } from '../../../../core/directives/click-outside.directive';
import { ContactService } from '../../../../core/services/contact.service';
import { TranslatePipe } from '../../../../core/i18n/translate.pipe';
import { IconComponent } from '../../../../shared/components/icon/icon.component';

@Component({
  selector: 'app-home-navbar',
  standalone: true,
  imports: [CommonModule, ClickOutsideDirective, TranslatePipe, IconComponent],
  templateUrl: './home-navbar.component.html',
  styleUrls: ['./home-navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeNavbarComponent {
  @Output() sectionSelected = new EventEmitter<string>();

  menuOpen = false;
  portalMenuOpen = false;

  constructor(
    private router: Router,
    private contactService: ContactService
  ) {}

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu(): void {
    this.menuOpen = false;
  }

  togglePortalMenu(): void {
    this.portalMenuOpen = !this.portalMenuOpen;
  }

  closePortalMenu(): void {
    this.portalMenuOpen = false;
  }

  onSelectSection(sectionId: string): void {
    this.closeMenu();
    this.sectionSelected.emit(sectionId);
  }

  goPatient(): void {
    this.closeMenu();
    this.closePortalMenu();
    this.router.navigate(['/patient']);
  }

  goPsych(): void {
    this.closeMenu();
    this.closePortalMenu();
    this.router.navigate(['/psych/login']);
  }

  openWhatsApp(): void {
    this.contactService.openWhatsApp();
  }

  openInstagram(): void {
    this.contactService.openInstagram();
  }
}
