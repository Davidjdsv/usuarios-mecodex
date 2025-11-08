import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { UsuariosWebClosterInterface } from 'src/app/models/usuarios-web-closter-interface';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedIn = signal(false); // Bandera en primer estado falso para verificar si el usuario está autenticado

  private apiLoginURL = signal(environment.api_usuarios_web_closter); // Será tanto para las tareas del CRUD como para obtener token
  // private apiLoginUWCURL = signal(environment.api_login_uwc);

  constructor(private http: HttpClient, private router: Router) { }

  loginUsuarioService(nombre_usuario: string, contrasena: string): Observable<UsuariosWebClosterInterface>{
    const url = new URL(`${this.apiLoginURL()}?login`);
    url.searchParams.append('nombre_usuario', nombre_usuario);
    url.searchParams.append('contrasena', contrasena);
    return this.http.get<UsuariosWebClosterInterface>(url.toString());
  }
  // /**
  //  * Enviar credenciales al backend y recibir token
  //  * @param usuario - Nombre de usuario o email
  //  * @param clave - Contraseña
  //  * @returns Observable con la respuesta del servidor
  //  */
  // login(usuario: string, clave: string): Observable<any> {
  //   return this.http.post<any>(this.apiLoginURL(), { usuario, clave }).pipe(
  //     tap(res =>{
  //       if(res.token){
  //         console.log(res.token)
  //       }
  //     })
  //   )
  // }

}
