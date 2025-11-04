import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { PaisesInterface } from 'src/app/models/paises-interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaisServicioService {

  constructor(private http: HttpClient) { }

  api = signal(environment.api_paises)

  getPaises(): Observable<PaisesInterface[]>{
    return this.http.get<PaisesInterface[]>(this.api());
  }
}
