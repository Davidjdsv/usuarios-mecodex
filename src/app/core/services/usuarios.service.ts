import { Injectable, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable, map } from 'rxjs';
import {
  UsuariosInterface,
  UsuariosResponseInterface,
} from '../../models/usuarios-interface';

@Injectable({
  providedIn: 'root',
})
export class UsuariosService {
  api = signal(environment.api_db);

  private http = inject(HttpClient);

  /**
  * Obtiene la lista de usuarios
  * @returns Observable<UsuariosInterface[]>
  */
  getUsuarios(): Observable<UsuariosInterface[]> {
    return this.http.get<UsuariosResponseInterface>(this.api()).pipe(
      map((res) => res.data as UsuariosInterface[])
    );
  }

  getUsuario(id: number, id_cuenta: number): Observable<UsuariosInterface[]> {
    const url = new URL(this.api());
    url.searchParams.append('id', id.toString());
    url.searchParams.append('id_cuenta', id_cuenta.toString());
    
    return this.http.get<UsuariosInterface[]>(url.toString());
  }

  /**
  * Crea un usuario
  * @param usuario toma el objeto para crear el usuario
  * @returns Observable con el usuario creado
  */
  createUser(usuario: UsuariosInterface): Observable<UsuariosInterface[]> {
    return this.http.post<UsuariosInterface[]>(this.api(), usuario);
  }

  /**
  * Actualiza un usuario
  * @param usuario toma el objeto para actualizar el usuario
  * @returns Observable con el usuario actualizado
  */
  updateUser(usuario: UsuariosInterface): Observable<UsuariosInterface[]>{
    const url = new URL(this.api());
    url.searchParams.append('id', usuario.id.toString());
    
    return this.http.put<UsuariosInterface[]>(url.toString(),usuario);
  }

  /**
  * Elimina un usuario
  * @param id toma el id del usuario a eliminar
  * @returns Observable con el usuario eliminado
  */
  deleteUser(id: number): Observable<UsuariosInterface[]> {
    const url = new URL(this.api());
    url.searchParams.append('id', id.toString());
    
    return this.http.delete<UsuariosInterface[]>(url.toString());
  }
}
