import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'patient',
    loadChildren: () => import('./features/patient/patient.routes').then(m => m.PATIENT_ROUTES)
  },
  {
    path: 'psych',
    loadChildren: () => import('./features/psychologist/psych.routes').then(m => m.PSYCH_ROUTES)
  },
  { path: '**', redirectTo: '' }
];
