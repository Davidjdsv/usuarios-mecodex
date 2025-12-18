import { Injectable, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CuentaInterface, CuentaResponseInterface } from 'src/app/models/cuenta-interface';
import { Observable, catchError, map, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CuentaService {
  ApiCuentas = signal(environment.api_cuentas);
  
  // Signal para almacenar la licencia seleccionada
  idLicenciaSeleccionada = signal<number | null>(null);

  private http = inject(HttpClient)

  /**
  * Obtiene todas las cuentas disponibles.
  *
  * @returns Observable con un array de objetos CuentaInterface.
  */
  getCuenta(): Observable<CuentaInterface[]> {
    return this.http.get<CuentaResponseInterface>(this.ApiCuentas())
    .pipe(map((res) => res.data));
  }

  /**
  * Crea una nueva cuenta para un cliente.
  *
  * @param cuenta Objeto con los datos de la cuenta a crear.
  * @returns Observable con la cuenta creada.
  */	
  createCuenta(cuenta: CuentaInterface): Observable<CuentaInterface>{
    const url = new URL(this.ApiCuentas());
    return this.http.post<CuentaInterface>(url.toString(), cuenta).pipe(
      catchError((error) => {
        return throwError(() => new Error(error.message))
      })
    )
  }

/**
 * Actualiza la licencia asociada a un cliente.
 *
 * @param id_licencia Identificador de la licencia a asignar.
 * @param id_cliente Identificador del cliente.
 * @returns Observable con la cuenta actualizada.
 */
  updateCuentaLicencia(id_licencia: number, id_cliente: any): Observable<CuentaInterface>{
    const url = new URL(this.ApiCuentas());
    url.searchParams.append('id_cliente', id_cliente.toString());
    url.searchParams.append('id_licencia', id_licencia.toString());

    return this.http.put<CuentaInterface>(url.toString(), {}).pipe(
      catchError((error) => {
        return throwError(() => new Error(error.message))
      })
    )
  }


}
