import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { PermisosDataInterface, PermisosInterface, PermisosResponseInterface } from 'src/app/models/permisos';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PermisosService {

  private http = inject(HttpClient);
  private url_api_permisos = signal(environment.api_permisos); 

  /**
  * Obtiene la lista de permisos
  * @returns Observable<PermisosResponseInterface>
  */
  getPermisos(): Observable<PermisosDataInterface>{
    const url = new URL(this.url_api_permisos());
    
    return this.http.get<PermisosResponseInterface>(url.toString()).pipe(
      map((res) => res.data as PermisosDataInterface)
    )
  }

}
