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

  private http = inject(HttpClient);

  /**
  * Obtiene todas las cuentas disponibles.
  *
  * @returns Observable con un array de objetos CuentaInterface.
  */
  getCuenta(id_cliente: number): Observable<CuentaInterface[]> {
    const url = new URL(this.ApiCuentas());
    return this.http.get<CuentaResponseInterface>(`${url.toString()}?id_cliente=${id_cliente}`)
    .pipe(map((res) => res.data as CuentaInterface[]));
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
        return throwError(() => new Error(error.message));
      })
    )
  }

/**
 * Actualiza la licencia asociada a un cliente.
 *
 * @param id_licencia Identificador de la licencia a asignar.
 * @param id_cuenta Identificador del cliente.
 * @returns Observable con la cuenta actualizada.
 */
  updateCuentaLicencia(id_licencia: number, id_cuenta: any): Observable<CuentaInterface>{
    const url = new URL(this.ApiCuentas());
    url.searchParams.append('id_cuenta', id_cuenta.toString());
    url.searchParams.append('id_licencia', id_licencia.toString());

    return this.http.put<CuentaInterface>(url.toString(), {}).pipe(
      catchError((error) => {
        return throwError(() => new Error(error.message));
      })
    )
  }


}
