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
      roles: ["Administrador"]
    },
    loadComponent: () => import('./pages/inicio/inicio.page').then( m => m.InicioPage)
  },
  {
    path: 'usuarios',
    canActivate: [authLoginGuard, rolesGuard],
    data: {
      roles: ["Administrador", "Soporte"]
    },
    loadComponent: () => import('./pages/usuarios/usuarios.page').then( m => m.UsuariosPage),
  },
  {
    path: 'usuario/:id',
    data: {
      roles: ["Administrador", "Soporte"]
    },
    canActivate: [authLoginGuard, rolesGuard],
    loadComponent: () => import('./pages/usuario/usuario.page').then( m => m.UsuarioPage)
  },
  {
    path: 'usuarios-web-closter',
    data: {
      roles: ["Administrador", "Soporte"]
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
      roles: ["Administrador"]
    },
    canActivate: [authLoginGuard, rolesGuard],
    loadComponent: () => import('./pages/usuario-web-closter/usuario-web-closter.page').then( m => m.UsuarioWebClosterPage)
  },
  {
    path: '**',
    redirectTo: 'inicio',
  },
];
