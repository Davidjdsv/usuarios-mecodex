import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { LoginResponseInterface, UsuariosWebClosterInterface } from 'src/app/models/usuarios-web-closter-interface';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedIn = signal(false); // Bandera en primer estado falso para verificar si el usuario está autenticado

  private apiLoginURL = signal(environment.api_usuarios_web_closter); // Será tanto para las tareas del CRUD como para obtener token
  private tokenKey: string = "authToken";
  private userKey: string = "authUsuario";

  // Propiedad de solo lectura para exponer el estado de autenticación
  public get authState(){
    return this.isLoggedIn.asReadonly();
  }

  constructor(private http: HttpClient, private router: Router) { }

  loginUsuarioService(nombre_usuario: string, contrasena: string): Observable<LoginResponseInterface>{
    const url = (`${this.apiLoginURL()}?login`);
    return this.http.post<LoginResponseInterface>(url.toString(), { 
      usuario: nombre_usuario,
      contrasena: contrasena }).pipe(
      tap(res => {
        if(res.token){
          console.log(res.token)
          this.setToken(res.token);
          this.isLoggedIn.set(true);
          // Guarda el usuario autenticado para poder consultar su rol y otros datos posteriormente
          localStorage.setItem(this.userKey, JSON.stringify(res.data));
        }
      })
    )
  }

  private getToken(): string | null{
    return localStorage.getItem(this.tokenKey);
  }

  private setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  isAutenthicate(): boolean {
    const token = this.getToken();
    if(!token){
      return false   
    }

    const payload = JSON.parse(atob(token.split('.')[1]))
    const exp = payload.exp * 1000;
    return Date.now() < exp;
  }

  /**
   * Obtiene el usuario autenticado desde almacenamiento local.
   * Retorna null si no existe.
   */
  getCurrentUser(): UsuariosWebClosterInterface | null {
    //Obtiene el localstorage desde el userKey
    const raw = localStorage.getItem(this.userKey);
    if (!raw) return null;
    try {
      return JSON.parse(raw) as UsuariosWebClosterInterface;
    } catch {
      return null;
    }
  }

  /**
   * Obtiene el id del rol del usuario autenticado.
   * Prioriza el usuario almacenado; opcionalmente intenta leer del token si el claim existe.
   */
  getCurrentUserRole(): string | null {
    const user = this.getCurrentUser();
    if (user && typeof user.id_rol_usuario === 'number') {
      switch(user.id_rol_usuario){
        case 1:
          return "administrador";
        case 2:
          return "soporte";
        default:
          return null;
      }
    }
    const token = this.getToken();
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        if (typeof payload?.id_rol_usuario === 'number') {
          return payload.id_rol_usuario.toString();
        }
      } catch {}
    }
    return null;
  }

  /**
   * Verifica si el usuario autenticado posee alguno de los roles permitidos.
   */
  hasRole(allowedRoles: string[]): boolean {
    const role = this.getCurrentUserRole();
    console.log("El rol actual del usuario en authservice es: ", role)
    return role != null && allowedRoles.includes(role.toString());
  }

  logOut(): void {
    localStorage.removeItem(this.tokenKey)
    localStorage.removeItem(this.userKey)
    this.isLoggedIn.set(false);
    this.router.navigate(['/login']);
  }

}
