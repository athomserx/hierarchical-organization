import { Routes } from '@angular/router';
import { Login } from './presentation/pages/login/login';
import { MainLayout } from './presentation/layouts/main-layout/main-layout';
import { authGuard } from './auth/auth-guard';
import { HierarchyModules } from './presentation/pages/hierarchy-modules/hierarchy-modules';
import { Users } from './presentation/pages/users/users';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: '',
    component: MainLayout,
    canActivate: [],
    children: [
      {
        path: 'home',
        component: HierarchyModules,
      },
      {
        path: 'users',
        component: Users,
      },
    ],
  },
  {
    path: 'login',
    component: Login,
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];
