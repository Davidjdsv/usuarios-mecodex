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

  logOut(): void {
    localStorage.removeItem(this.tokenKey)
    this.isLoggedIn.set(false);
    this.router.navigate(['/login']);
  }

}
