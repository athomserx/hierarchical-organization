import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth-service';

export const authGuard: CanActivateFn = (state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const logged = authService.isLoggedIn();

  if (logged) {
    return true;
  } else {
    router.navigate(['login'], { queryParams: { returnUrl: state.url } });

    return false;
  }
};
