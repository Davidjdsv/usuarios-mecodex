import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CuentaLicenciaService {

  constructor(private http: HttpClient) { }

  ApiCuentaLicencia = signal(environment.api_cuenta_licencia);

  updateCuentaLicencia(id_licencia: number, id_cliente: number){
    const url = new URL(this.ApiCuentaLicencia());
    url.searchParams.append('id_cliente', id_cliente.toString());
    url.searchParams.append('id_licencia', id_licencia.toString());
    return this.http.put(url.toString(), {});
  }
}
