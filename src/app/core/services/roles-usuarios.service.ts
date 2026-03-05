import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';
import { RolesInterface, RolesResponseInterface } from 'src/app/models/roles-interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RolesUsuariosService {
  private url = signal(environment.api_roles);

  private http = inject(HttpClient);

  getRoles(): Observable<RolesInterface[]>{
    const url = `${this.url()}`;
    return this.http.get<RolesResponseInterface>(url).pipe(
      map(res => res.data as RolesInterface[])
    )
  }

  createRoles(rol: RolesInterface): Observable<RolesInterface[]> {
    const url = `${this.url()}`
    return this.http.post<RolesInterface[]>(url, rol).pipe(
      catchError((error) => {
        console.error("Error al crear un nuevo rol: ", error.message)
        return throwError(() => new Error(error.message))
      })
    )
  }

  getPermisosActivos(rol: RolesInterface): Observable<RolesInterface[]> {
    const url = `${this.url()}?id_rol=${rol.id_rol}`

    return this.http.get<RolesResponseInterface>(url).pipe(
      map(res => res.data as RolesInterface[])
    )
  }

  /**
   * Actualiza un rol con sus permisos activos
   * @param rol Rol a actualizar
   * @param permisos Array de IDs de permisos activos
   * @returns Observable con el rol actualizado
   */
  updateRol(rol: RolesInterface, permisos: number[]): Observable<any> {
    const body = {
      ...rol,
      permisos: permisos // Enviamos el array de IDs seleccionados
    };
    
    const url = `${this.url()}?id_rol=${rol.id_rol}`;

    return this.http.put(url, body).pipe(
      catchError((error) => {
        console.error("Error al actualizar el rol: ", error.message);
        return throwError(() => new Error(error.message));
      })
    );
  }

  deleteRol(idRol: RolesInterface): Observable<RolesInterface[]>{
    const url = `${this.url()}?id=${idRol.id_rol}`
    return this.http.delete<RolesResponseInterface>(url).pipe(
      map(res => res.data as RolesInterface[]),
      catchError((error) => {
        console.error("Error al eliminar el rol: ", error.message);
        return throwError(() => new Error(error.message));
      })
    );
  }

}
