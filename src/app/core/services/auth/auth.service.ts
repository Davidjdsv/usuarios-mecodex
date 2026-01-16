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
          // Guarda el usuario autenticado para poder consultar su rol con permisos y otros datos posteriormente
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
   * Obtiene TODOS los permisos del usuario desde el token JWT.
   * Retorna un array vacío si no hay token o hay error.
   */
  getPermisosUsuario(): number[] {
      const token = this.getToken();
      
      if (!token) {
        console.warn("No hay token disponible");
        return [];
      }
      
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));

        console.log("Payload del token:", payload);

        // Primero se verifica si el usuario está activo en la plataforma antes de obtener sus permisos
        if(payload.activo !== 1){
          console.warn("El usuario no está activo");
          return payload.activo
        }
        
        // El backend envía permisos como array: [1, 2, 3, 5, 6, 7, 8, 9]
        if (Array.isArray(payload?.permisos)) {
          return payload.permisos;
        }
        
        console.warn("El token no contiene un array de permisos válido");
        return [];
      } catch (err) {
        console.error("Error al decodificar el token:", err);
        return [];
      }
  }

  // Variable observable para el rol del usuario logeado
  rolUsuario = new BehaviorSubject<UsuariosWebClosterInterface | null>(this.getCurrentUser())
  rolUsuarioLogeado$ = this.rolUsuario.asObservable();

  actualizarRol(){
    this.rolUsuario.next(this.getCurrentUser());
  }

  /**
   * Verifica si el usuario está activo en la plataforma.
   * Primero se verifica si el usuario está activo antes de preguntar por permisos
   * @returns Verdadero si el usuario está activo; falso en caso contrario.
   */
  isActivo(): boolean {
    const token = this.getToken();
    
    if (!token) {
      console.warn("No hay token disponible");
      return false;
    }
    
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));

      console.log("Payload del token:", payload);

      // Primero se verifica si el usuario está activo en la plataforma antes de obtener sus permisos
      if(payload.activo !== 1){
        console.warn("El usuario no está activo");
        return false;
      }
      
      return true;
      
    } catch (err) {
      console.error("Error al decodificar el token:", err);
      return false;
    }
  }

  /**
   * Verifica si el usuario tiene AL MENOS UNO de los permisos requeridos.
   * @param permisosRequeridos Array de IDs de permisos permitidos (ej: [1, 5, 9])
   * @returns true si el usuario tiene alguno de esos permisos
   */
  hasPermisos(permisosRequeridos: number[]): boolean {
      const permisosUsuario = this.getPermisosUsuario(); // Array: [1, 2, 3, 5, 6, 7, 8, 9]

      if (permisosUsuario.length === 0) {
        console.warn("El usuario no tiene permisos asignados");
        return false;
      }
      
      // Verifica si hay ALGÚN permiso en común
      const tienePermiso = permisosRequeridos.some(permiso => 
        permisosUsuario.includes(permiso)
      );
      
      console.log(`Permisos del usuario:`, permisosUsuario);
      console.log(`Permisos requeridos:`, permisosRequeridos);
      console.log(`¿Tiene acceso?`, tienePermiso);
      
      return tienePermiso;
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
