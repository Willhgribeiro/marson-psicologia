import { ApplicationConfig } from '@angular/core';
import { provideRouter, withInMemoryScrolling, withViewTransitions } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideAppFirebase } from './core/firebase/firebase.providers';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      routes,
      withViewTransitions(),
      withInMemoryScrolling({
        anchorScrolling: 'enabled',            // rola até #fragment (ex.: /privacidade#direitos)
        scrollPositionRestoration: 'enabled'   // nova página abre no topo; "voltar" restaura a posição
      })
    ),
    provideClientHydration(withEventReplay()),
    provideAppFirebase()
  ]
};

