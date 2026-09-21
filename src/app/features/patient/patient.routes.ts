import { Routes } from '@angular/router';

export const PATIENT_ROUTES: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        loadComponent: () => import('./patient-form/patient-form.component').then(m => m.PatientFormComponent)
      },
      {
        path: 'success',
        loadComponent: () => import('./patient-success/patient-success.component').then(m => m.PatientSuccessComponent)
      }
    ]
  }
];

