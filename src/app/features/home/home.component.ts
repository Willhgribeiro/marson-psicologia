import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ContactService } from '../../core/services/contact.service';
import { HomeNavbarComponent } from './components/home-navbar/home-navbar.component';
import { HomeHeroComponent } from './components/home-hero/home-hero.component';
import { HomeSpecialtiesComponent } from './components/home-specialties/home-specialties.component';
import { HomeFaqComponent } from './components/home-faq/home-faq.component';
import { HomeContactComponent } from './components/home-contact/home-contact.component';
import { HomeLocationComponent } from './components/home-location/home-location.component';
import { HomeFooterComponent } from './components/home-footer/home-footer.component';
import { WhatsappFabComponent } from '../../shared/components/whatsapp-fab/whatsapp-fab.component';
import { WhatsappStickyMobileComponent } from '../../shared/components/whatsapp-sticky-mobile/whatsapp-sticky-mobile.component';

@Component({
    selector: 'app-home',
    imports: [
        CommonModule,
        HomeNavbarComponent,
        HomeHeroComponent,
        HomeSpecialtiesComponent,
        HomeFaqComponent,
        HomeContactComponent,
        HomeLocationComponent,
        HomeFooterComponent,
        WhatsappFabComponent,
        WhatsappStickyMobileComponent
    ],
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {
  constructor(private contactService: ContactService) {}

  openWhatsApp(): void {
    this.contactService.openWhatsApp();
  }

  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
