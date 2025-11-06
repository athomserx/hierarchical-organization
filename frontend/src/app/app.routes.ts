import { Routes } from '@angular/router';
import { Login } from './presentation/pages/login/login';
import { MainLayout } from './presentation/layouts/main-layout/main-layout';
import { authGuard } from './auth/auth-guard';
import { HierarchyModules } from './presentation/pages/hierarchy-modules/hierarchy-modules';
import { Users } from './presentation/pages/users/users';
import { EditHierarchyModule } from './presentation/pages/edit-hierarchy-module/edit-hierarchy-module';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'modules',
    pathMatch: 'full',
  },
  {
    path: '',
    component: MainLayout,
    canActivate: [authGuard],
    children: [
      {
        path: 'modules',
        component: HierarchyModules,
      },
      {
        path: 'modules/edit/:id',
        component: EditHierarchyModule,
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
    redirectTo: 'modules',
  },
];
