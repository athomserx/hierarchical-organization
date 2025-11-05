import { Routes } from '@angular/router';
import { Login } from './presentation/pages/login/login';
import { MainLayout } from './presentation/layouts/main-layout/main-layout';
import { authGuard } from './auth/auth-guard';
import { Home } from './presentation/pages/home/home';

export const routes: Routes = [
  {
    path: 'login',
    component: Login,
  },
  {
    path: '',
    component: MainLayout,
    canActivate: [authGuard],
    children: [
      {
        path: 'home',
        component: Home,
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'company/dashboard',
  },
];
