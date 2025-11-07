import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth-service/auth.service';

export const authLoginGuard: CanActivateFn = (route, state) => {
  const authLogin = inject(AuthService)
  // return authLogin.isAuthenticated()
};
