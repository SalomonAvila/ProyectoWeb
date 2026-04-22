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
    path: 'coordinator',
    loadChildren: () =>
      import('./features/coordinator/coordinator.routes').then(
        m => m.COORDINATOR_ROUTES
      )
  },
  {
    path: 'administrator',
    loadChildren: () =>
      import('./features/administrator/administrator.routes').then(
        m => m.ADMINISTRATOR_ROUTES
      )
  }
];
