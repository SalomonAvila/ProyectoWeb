import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./features/auth/auth.routes').then(m => m.AUTH_ROUTES)
  },
  {
    path: 'profesor',
    loadChildren: () =>
      import('./features/profesor/profesor.routes').then(m => m.PROFESOR_ROUTES)
  },
  {
    path: 'profesor/home',
    loadComponent: () =>
      import('./features/profesor/pages/home/home').then(m => m.Home)
  },
  {
    path: 'profesor/reportar',
    loadComponent: () =>
      import('./features/profesor/pages/reporte/reporte').then(m => m.Reporte)
  }
];