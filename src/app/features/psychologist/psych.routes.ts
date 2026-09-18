import { Routes } from '@angular/router';
import { provideAppFirebase } from '../../core/firebase/firebase.providers';

export const PSYCH_ROUTES: Routes = [
  {
    path: '',
    providers: [provideAppFirebase()],
    children: [
      {
        path: 'login',
        loadComponent: () => import('./psych-login/psych-login.component').then(m => m.PsychLoginComponent)
      },
      {
        path: 'panel',
        loadComponent: () => import('./psych-panel/psych-panel.component').then(m => m.PsychPanelComponent)
      },
      {
        path: 'patient/:id',
        loadComponent: () => import('./patient-detail/patient-detail.component').then(m => m.PatientDetailComponent)
      },
      {
        path: 'register',
        loadComponent: () => import('./patient-register/patient-register.component').then(m => m.PatientRegisterComponent)
      }
    ]
  }
];
