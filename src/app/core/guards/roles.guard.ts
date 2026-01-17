// roles.guard.ts
import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { inject } from '@angular/core';

export const rolesGuard: CanActivateFn = (route, state) => {
  // 1. Leemos la configuración 'data' definida en app.routes.ts
  // route.data['roles'] nos dará algo como ["Administrador", "Soporte"]
  const permisosEsperados = route.data?.['permisos'] as number[];
  console.log("Los permisos esperados son: ", permisosEsperados)

  // 2. Inyectamos el servicio de autenticación
  const authService = inject(AuthService);

  // 3. Verificamos si el usuario cumple con alguno de los permisos esperados
  const tienePermiso = authService.hasPermisos(permisosEsperados);
  console.log("¿Tiene permiso?: ", tienePermiso)

  // 4. (Opcional recomendado) Manejo de "Acceso Denegado"
  if (!tienePermiso) {
    console.warn('Acceso denegado: Permiso insuficiente para esta ruta.');
    // Aquí podrías inyectar el Router y redirigir a un 'forbidden' o al 'inicio'
    // const router = inject(Router);
    // router.navigate(['/inicio']);
  }

  return tienePermiso;
};