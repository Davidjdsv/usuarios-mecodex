import { Routes } from '@angular/router';
import { authLoginGuard } from './core/guards/auth-login.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'inicio',
    pathMatch: 'full',
  },
  {
    path: 'inicio',
    canActivate: [authLoginGuard],
    loadComponent: () => import('./pages/inicio/inicio.page').then( m => m.InicioPage)
  },
  {
    path: 'usuarios',
    canActivate: [authLoginGuard],
    loadComponent: () => import('./pages/usuarios/usuarios.page').then( m => m.UsuariosPage),
  },
  {
    path: 'usuario/:id',
    canActivate: [authLoginGuard],
    loadComponent: () => import('./pages/usuario/usuario.page').then( m => m.UsuarioPage)
  },
  {
    path: 'usuarios-web-closter',
    canActivate: [authLoginGuard],
    loadComponent: () => import('./pages/usuarios-web-closter/usuarios-web-closter.page').then( m => m.UsuariosWebClosterPage)
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then( m => m.LoginPage)
  },
  {
    path: '**',
    redirectTo: 'inicio',
  },
];
