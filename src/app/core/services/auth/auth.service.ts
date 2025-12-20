import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
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

  /**
   * 
   * @param nombre_usuario Nombre de usuario para autenticación.
   * @param contrasena Contraseña para autenticación.
   * @returns Observable con la respuesta de autenticación a obtener el token.
   */
  loginUsuarioService(nombre_usuario: string, contrasena: string): Observable<LoginResponseInterface>{
    const url = (`${this.apiLoginURL()}?login`);
    return this.http.post<LoginResponseInterface>(url.toString(), { 
      usuario: nombre_usuario,
      contrasena: contrasena }).pipe(
      tap(res => {
        if(res.token){
          console.log(res.token)
          this.setToken(res.token);
          // Actualiza el rol del usuario logeado
          this.isLoggedIn.set(true);
          // Guarda el usuario autenticado para poder consultar su rol y otros datos posteriormente
          localStorage.setItem(this.userKey, JSON.stringify(res.data));
          this.actualizarRol();
        }
      })
    )
  }

  /**
   * Obtiene el token almacenado en localStorage.
   * @returns El token de autenticación o null si no existe.
   */
  private getToken(): string | null{
    return localStorage.getItem(this.tokenKey);
  }

  /**
   * Establece el token de autenticación en localStorage.
   * @param token El token de autenticación a almacenar.
   */
  private setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  /**
   * Verifica si el usuario está autenticado basándose en la presencia y validez del token.
   * @returns Verdadero si el usuario está autenticado y el token es válido; falso en caso contrario.
   */
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
  getCurrentUserRole(): string {
    const user = this.getCurrentUser();
    if (user && typeof user.id_rol_usuario === 'number') {
      switch(user.id_rol_usuario){
        case 1:
          return "Administrador";
        case 2:
          return "Soporte";
        default:
          return "";
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
    return "";
  }

  // Variable observable para el rol del usuario logeado
  rolUsuario = new BehaviorSubject<UsuariosWebClosterInterface | null>(this.getCurrentUser())
  rolUsuarioLogeado$ = this.rolUsuario.asObservable();

  actualizarRol(){
    this.rolUsuario.next(this.getCurrentUser());
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
    // Actualiza el rol del usuario logeado a vacío
    this.actualizarRol();
  }

}
