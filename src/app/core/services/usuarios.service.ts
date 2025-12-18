import { Injectable, signal } from '@angular/core';
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

  constructor(private http: HttpClient) {}

  // * Nota: Los datos de la interface, si no son opcionales, deben de ser incluidos en la solicitud.
  getUsuarios(): Observable<UsuariosInterface[]> {
    return this.http.get<UsuariosResponseInterface>(this.api()).pipe(
      map((res) => res.data as UsuariosInterface[])
    );
  }

  createUser(usuario: UsuariosInterface): Observable<UsuariosInterface[]> {
    return this.http.post<UsuariosInterface[]>(this.api(), usuario);
  }

  updateUser(usuario: UsuariosInterface): Observable<UsuariosInterface[]>{
    const url = new URL(this.api());
    url.searchParams.append('id', usuario.id.toString());
    
    return this.http.put<UsuariosInterface[]>(url.toString(),usuario);
  }

  deleteUser(id: number): Observable<UsuariosInterface[]> {
    const url = new URL(this.api());
    url.searchParams.append('id', id.toString());
    
    return this.http.delete<UsuariosInterface[]>(url.toString());
  }
}
