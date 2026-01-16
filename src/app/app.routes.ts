import { Routes } from '@angular/router';
import { authLoginGuard } from './core/guards/auth-login.guard';
import { rolesGuard } from './core/guards/roles.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'inicio',
    pathMatch: 'full',
  },
  {
    path: 'inicio',
    canActivate: [authLoginGuard, rolesGuard],
    data: {
      permisos: [9]
    },
    loadComponent: () => import('./pages/inicio/inicio.page').then( m => m.InicioPage)
  },
  {
    path: 'usuarios',
    canActivate: [authLoginGuard, rolesGuard],
    data: {
      permisos: [1]
    },
    loadComponent: () => import('./pages/usuarios/usuarios.page').then( m => m.UsuariosPage),
  },
  {
    path: 'usuario/:id',
    data: {
      permisos: [1]
    },
    canActivate: [authLoginGuard, rolesGuard],
    loadComponent: () => import('./pages/usuario/usuario.page').then( m => m.UsuarioPage)
  },
  {
    path: 'usuarios-web-closter',
    data: {
      permisos: [5]
    },
    canActivate: [authLoginGuard, rolesGuard],
    loadComponent: () => import('./pages/usuarios-web-closter/usuarios-web-closter.page').then( m => m.UsuariosWebClosterPage)
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'usuario-web-closter/:id_usuario_wc',
    data: {
      permisos: [5]
    },
    canActivate: [authLoginGuard, rolesGuard],
    loadComponent: () => import('./pages/usuario-web-closter/usuario-web-closter.page').then( m => m.UsuarioWebClosterPage)
  },
  {
    path: 'configuracion-permisos',
    data: {
      permisos: [10]
    },
    canActivate: [authLoginGuard, rolesGuard],
    loadComponent: () => import('./pages/configuracion-permisos/configuracion-permisos.page').then( m => m.ConfiguracionPermisosPage)
  },
  {
    path: '**',
    redirectTo: 'inicio',
  },
];
