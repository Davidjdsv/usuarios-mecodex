import { Injectable, signal } from '@angular/core';
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

  constructor(private http: HttpClient) { }

  getUsuariosWebCloster(): Observable<UsuariosWebClosterInterface[]>{
    return this.http.get<UsuariosWebClosterResponseInterface>(this.apiWebCloster()).pipe(
      map(res => {
        return res.data.map((usuario: UsuariosWebClosterInterface) => ({
          id_usuario_wc: usuario.id_usuario_wc,
          nombre_completo: usuario.nombre_completo,
          id_tipo_documento: usuario.id_tipo_documento,
          abreviatura: usuario.abreviatura,
          documento: usuario.documento,
          contacto: usuario.contacto,
          correo: usuario.correo,
          id_rol_usuario: usuario.id_rol_usuario,
          nombre_usuario: usuario.nombre_usuario,
          contrasena: usuario.contrasena,
        }))
      })
    )
  }

  createUsuariosWebCloster(usuario: UsuariosWebClosterInterface): Observable<UsuariosWebClosterInterface[]>{
    const url = this.apiWebCloster()
    return this.http.post<UsuariosWebClosterInterface[]>(url, usuario).pipe(
      catchError((error) => {
        console.error("Error al crear un nuevo usuario: ", error.message)
        return throwError(() => new Error(error.message))
      })
    )
  }

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
