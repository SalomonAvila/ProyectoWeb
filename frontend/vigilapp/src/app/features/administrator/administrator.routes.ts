import { Routes } from '@angular/router';

export const ADMINISTRATOR_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./pages/home/home').then(m => m.Home)
  },
  {
    path: 'zones',
    loadComponent: () =>
      import('./pages/zones/zones').then(m => m.Zones)
  },
  {
    path: 'shifts',
    loadComponent: () =>
      import('./pages/shifts/shifts').then(m => m.Shifts)
  },
  {
    path: 'config',
    loadComponent: () =>
      import('./pages/config/config').then(m => m.Config)
  },
  {
    path: 'reports',
    loadComponent: () =>
      import('./pages/reports/reports').then(m => m.Reports)
  }
];
