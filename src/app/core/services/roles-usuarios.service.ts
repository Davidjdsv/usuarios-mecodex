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

}
