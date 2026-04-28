import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./features/auth/auth.routes').then(m => m.AUTH_ROUTES)
  },
  {
    path: 'profesor',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./features/profesor/profesor.routes').then(m => m.PROFESOR_ROUTES)
    
  },
  {
    path: 'coordinator',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./features/coordinator/coordinator.routes').then(
        m => m.COORDINATOR_ROUTES
      )
  },
  {
    path: 'administrator',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./features/administrator/administrator.routes').then(
        m => m.ADMINISTRATOR_ROUTES
      )
  }
];
