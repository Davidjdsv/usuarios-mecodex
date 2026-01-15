// roles.guard.ts
import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { inject } from '@angular/core';

export const rolesGuard: CanActivateFn = (route, state) => {
  // 1. Leemos la configuración 'data' definida en app.routes.ts
  // route.data['roles'] nos dará algo como ["Administrador", "Soporte"]
  const rolesEsperados = route.data?.['roles'] as string[];

  // 2. Inyectamos el servicio de autenticación
  const authService = inject(AuthService);

  // 3. Verificamos si el usuario cumple con alguno de los roles esperados
  const tienePermiso = authService.hasRole(rolesEsperados);

  // 4. (Opcional recomendado) Manejo de "Acceso Denegado"
  if (!tienePermiso) {
    console.warn('Acceso denegado: Rol insuficiente para esta ruta.');
    // Aquí podrías inyectar el Router y redirigir a un 'forbidden' o al 'inicio'
    // const router = inject(Router);
    // router.navigate(['/inicio']);
  }

  return tienePermiso;
};