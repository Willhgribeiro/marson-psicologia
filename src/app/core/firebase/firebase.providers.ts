import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { firebaseConfig } from '../../../firebase-config';

/**
 * Provedores do Firebase carregados sob demanda via Lazy Loading.
 * Evita inflar o bundle inicial da página inicial (Home), economizando mais de 450 KB de JS.
 */
export function provideAppFirebase(): EnvironmentProviders {
  return makeEnvironmentProviders([
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth())
  ]);
}
