import { Routes } from '@angular/router';

export const PROFESOR_ROUTES: Routes = [
  {
    path: 'reporte',
    loadComponent: () =>
      import('./pages/reporte/reporte').then(m => m.Reporte)
  }
];
