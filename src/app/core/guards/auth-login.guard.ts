import { inject } from '@angular/core';
import { CanActivateFn, MaybeAsync, Router } from '@angular/router';
import { AuthService } from '../services/auth-service/auth.service';

export const authLoginGuard: CanActivateFn = (route, state): MaybeAsync<boolean> => {
  //Injectando dependencias
  const authLogin = inject(AuthService)
  const router = inject(Router)

  //Verifica que si está autenticado en al respuesta que tiene el servicio
  if(authLogin.isAutenthicate()){
    return true
  } else {
    router.navigate(['/login'])
    return false
  }
};
