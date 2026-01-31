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
  private permisosKey: string = "permisosKey"

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

          // DEBUG: Ver qué llega exactamente del backend
          console.group('🔐 Auth Service Login Success');
          console.log('Token recibido:', res.token);
          console.log('📦 DATOS USUARIO (RAW):', res.data.usuario); 
          console.log('⚠️ Verifica si existe la propiedad "nombre_usuario" en el objeto de arriba');
          console.groupEnd();
          this.setToken(res.token);
          // Actualiza el rol del usuario logeado
          this.isLoggedIn.set(true);
          // Guarda el usuario autenticado con sus datos
          localStorage.setItem(this.userKey, JSON.stringify(res.data));
          // Guarda los permisos de ese usuario
          localStorage.setItem(this.permisosKey, JSON.stringify(res.data.permisos));
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
   * Obtiene los permisos del usuario almacenados en localStorage.
   * @returns Un array de números que representan los permisos del usuario.
   */
  getPermisos(): number[] {
    const permisos = localStorage.getItem(this.permisosKey);
    return permisos ? JSON.parse(permisos) : [];
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
   * Obtiene la información del usuario autenticado desde almacenamiento local.
   * Retorna null si no existe.
   */
  getCurrentData(): UsuariosWebClosterInterface | null {
    //Obtiene el localstorage desde el userKey
    const raw = localStorage.getItem(this.userKey);
    if (!raw) return null;
    console.log("raw", JSON.parse(raw))
    try {
      return JSON.parse(raw) as UsuariosWebClosterInterface;
    } catch {
      return null;
    }
  }

/**
 * Obtiene TODOS los permisos del usuario desde localStorage.
 * Retorna un array vacío si no hay permisos o hay error.
 */
getPermisosUsuario(): number[] {
    // CAMBIO: Ya no lees del token, lees del localStorage donde guardaste los permisos
    const permisosRaw = localStorage.getItem(this.permisosKey);
    
    if (!permisosRaw) {
      console.warn("No hay permisos disponibles en localStorage");
      return [];
    }
    
    try {
      const permisos = JSON.parse(permisosRaw);
      
      // Verifica que sea un array válido
      if (Array.isArray(permisos)) {
        console.log("Permisos cargados:", permisos);
        return permisos;
      }
      
      console.warn("Los permisos no son un array válido");
      return [];
    } catch (err) {
      console.error("Error al parsear permisos:", err);
      return [];
    }
}

  // Variable observable para el rol del usuario logeado
  rolUsuario = new BehaviorSubject< UsuariosWebClosterInterface | null>(this.getCurrentData())
  rolUsuarioLogeado$ = this.rolUsuario.asObservable();

  actualizarRol(){
    this.rolUsuario.next(this.getCurrentData());
    console.log("rolUsuario", this.rolUsuario.value)
    console.log("rol usuario logeado", (this.rolUsuarioLogeado$))
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
    localStorage.removeItem(this.permisosKey);
    this.isLoggedIn.set(false);
    this.router.navigate(['/login']);
    // Actualiza el rol del usuario logeado a vacío
    this.actualizarRol();
  }

}
