import { CanActivateFn, MaybeAsync } from '@angular/router';
import { AuthService } from '../services/auth-service/auth.service';
import { inject } from '@angular/core';
import { map } from 'rxjs';

export const rolesGuard: CanActivateFn = (route, state): MaybeAsync<any> => {
  const roles = route.data?.["roles"] as string[]

  return inject(AuthService).hasRole(roles)

};
