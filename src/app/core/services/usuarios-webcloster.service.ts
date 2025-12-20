import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable, catchError, map, throwError } from 'rxjs';
import { UsuariosWebClosterInterface } from 'src/app/models/usuarios-web-closter-interface';
import { UsuariosWebClosterResponseInterface } from 'src/app/models/usuarios-web-closter-interface';

@Injectable({
  providedIn: 'root'
})
export class UsuariosWebClosterService {
  apiWebCloster = signal(environment.api_usuarios_web_closter)

  private http = inject(HttpClient);

  /**
  * Obtiene la lista de usuarios de Web Closter
  * @returns Observable<UsuariosWebClosterInterface[]>
  */
  getUsuariosWebCloster(): Observable<UsuariosWebClosterInterface[]>{
    return this.http.get<UsuariosWebClosterResponseInterface>(this.apiWebCloster()).pipe(
      map((res) => res.data as UsuariosWebClosterInterface[])
    )
  }

  /**
  * Crea un usuario de webCloster
  * @param usuario toma el objeto para crear el usuario
  * @returns Observable con el usuario creado
  */
  createUsuariosWebCloster(usuario: UsuariosWebClosterInterface): Observable<UsuariosWebClosterInterface[]>{
    const url = this.apiWebCloster()
    return this.http.post<UsuariosWebClosterInterface[]>(url, usuario).pipe(
      catchError((error) => {
        console.error("Error al crear un nuevo usuario: ", error.message)
        return throwError(() => new Error(error.message))
      })
    )
  }

  /**
  * Crea un usuario de webCloster
  * @param usuario toma el objeto para editar el usuario
  * @returns Observable con el usuario editado
  */
  updateUsuariosWebCloster(usuario: UsuariosWebClosterInterface): Observable<UsuariosWebClosterInterface[]>{
    const url = new URL(this.apiWebCloster())
    url.searchParams.append("id_usuario_wc", usuario.id_usuario_wc.toString())
    return this.http.put<UsuariosWebClosterInterface[]>(url.toString(), usuario).pipe(
      catchError((error) => {
        console.error("Error al editar un usuario: ", error.message)
        return throwError(() => new Error(error.message))
      })
    )
  }

  /**
  * Crea un usuario de webCloster
  * @param id toma el id del usuario a eliminar
  * @returns Observable con el usuario eliminado
  */
  deleteUsuarioWebCloster(id: number): Observable<UsuariosWebClosterInterface[]>{
    const url = new URL(this.apiWebCloster())
    url.searchParams.append("id_usuario_wc", id.toString())

    return this.http.delete<UsuariosWebClosterInterface[]>(url.toString()).pipe(
      catchError((error) => {
        console.error("Error al eliminar un usuario: ", error.message)
        return throwError(() => new Error(error.message))
      })
    )
  }
}
