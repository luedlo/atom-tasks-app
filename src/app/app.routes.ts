import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { NoAuthGuard } from './core/guards/no-auth.guard';

export const routes: Routes = [
  {
    path: 'auth',
    canActivate: [NoAuthGuard],
    loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'tasks',
    canActivate: [AuthGuard],
    loadChildren: () => import('./features/tasks/tasks.module').then(m => m.TasksModule)
  },
  {
    path: '',
    redirectTo: 'tasks',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'tasks'
  }
];