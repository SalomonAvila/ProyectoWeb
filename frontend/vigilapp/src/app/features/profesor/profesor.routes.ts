import { Routes } from '@angular/router';

export const PROFESOR_ROUTES: Routes = [
  {
    path: 'home',
    loadComponent: () =>
      import('./pages/home/home').then(m => m.Home)
  },
  {
    path: 'reporte',
    loadComponent: () =>
      import('./pages/reporte/reporte').then(m => m.Reporte)
  }
];
