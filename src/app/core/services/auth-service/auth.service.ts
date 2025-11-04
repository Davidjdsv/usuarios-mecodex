import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiLoginURL = signal(environment.api_login);

  constructor(private http: HttpClient, private router: Router) { }

  /**
   * Enviar credenciales al backend y recibir token
   * @param usuario - Nombre de usuario o email
   * @param clave - Contraseña
   * @returns Observable con la respuesta del servidor
   */
  login(usuario: string, clave: string): Observable<any> {
    return this.http.post<any>(this.apiLoginURL(), { usuario, clave }).pipe(
      tap(res =>{
        if(res.token){
          console.log(res.token)
        }
      })
    )
  }

}
