import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { LicenciaInterface, LicenciaResponseInterface } from 'src/app/models/licencia';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LicenciaService {

  constructor(private http: HttpClient) { }

  licencias = signal<LicenciaInterface[]>([]);


  getLicenciasService(): Observable<LicenciaResponseInterface> {
    return this.http.get<LicenciaResponseInterface>(environment.api_licencias).pipe(
      map((res: LicenciaResponseInterface) => {
        this.licencias.set(res.data)
        return res
      })
    )
  }
}
