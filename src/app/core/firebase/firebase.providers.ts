import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { initializeApp, provideFirebaseApp, getApps, getApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { firebaseConfig } from '../../../firebase-config';

/**
 * Provedores do Firebase configurados com padrão de inicialização singleton idempotente.
 * Garante que os serviços 'root' (PatientService e AuthService) tenham acesso garantido
 * a Firestore e Auth sem lançar NullInjectorError.
 */
export function provideAppFirebase(): EnvironmentProviders {
  return makeEnvironmentProviders([
    provideFirebaseApp(() => getApps().length > 0 ? getApp() : initializeApp(firebaseConfig)),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth())
  ]);
}

