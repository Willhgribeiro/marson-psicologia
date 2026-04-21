import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'patient',
    loadComponent: () => import('./features/patient/patient-form/patient-form.component').then(m => m.PatientFormComponent)
  },
  {
    path: 'patient/success',
    loadComponent: () => import('./features/patient/patient-success/patient-success.component').then(m => m.PatientSuccessComponent)
  },
  {
    path: 'psych/login',
    loadComponent: () => import('./features/psychologist/psych-login/psych-login.component').then(m => m.PsychLoginComponent)
  },
  {
    path: 'psych/panel',
    loadComponent: () => import('./features/psychologist/psych-panel/psych-panel.component').then(m => m.PsychPanelComponent)
  },
  {
    path: 'psych/patient/:id',
    loadComponent: () => import('./features/psychologist/patient-detail/patient-detail.component').then(m => m.PatientDetailComponent)
  },
  { path: '**', redirectTo: '' }
];
