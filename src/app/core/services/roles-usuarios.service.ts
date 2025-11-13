import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { RolesInterface, RolesResponseInterface } from 'src/app/models/roles-interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RolesUsuariosService {
  private url = signal(environment.api_roles);

  constructor(private http: HttpClient) { }

  getRoles(): Observable<RolesInterface[]>{
    const url = `${this.url()}`;
    return this.http.get<RolesResponseInterface>(url).pipe(
      map(res => {
        return res.data.map((rol: RolesInterface) => ({
          id_rol: rol.id_rol,
          nombre_rol: rol.nombre_rol,
        }))
      })
    )
  }
}
