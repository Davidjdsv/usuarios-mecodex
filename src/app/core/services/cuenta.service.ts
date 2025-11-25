import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CuentaInterface, CuentaResponseInterface } from 'src/app/models/cuenta-interface';
import { Observable, catchError, map, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CuentaService {
  ApiCuentas = signal(environment.api_cuentas);
  ApiCuentaLicencia = signal(environment.api_cuenta_licencia);

  constructor(private http: HttpClient) { }

  getCuenta(): Observable<CuentaInterface[]>{
    const url = new URL(this.ApiCuentas());
    return this.http.get<CuentaResponseInterface>(url.toString()).pipe(
      map(res => {
        return res.data.map((res: CuentaInterface) => ({
          id: res.id,
          correo: res.correo,
          estado: res.estado,
          gmail: res.gmail,
          idapp_sta: res.idapp_sta,
          idapp_din: res.idapp_din,
          password: res.password,
          fecha: res.fecha,
          ultimo_salvado_datos: res.ultimo_salvado_datos,
          calificacion: res.calificacion,
          mensaje_calificacion: res.mensaje_calificacion,
          fecha_calificacion: res.fecha_calificacion,
          version_app: res.version_app,
          modo_conexion: res.modo_conexion,
          fecha_actualizacion_modo_conexion: res.fecha_actualizacion_modo_conexion,
          estado_confirmacion_dispositivo: res.estado_confirmacion_dispositivo,
          fecha_confirmacion_dispositivo: res.fecha_confirmacion_dispositivo,
          estado_actualizacion_app: res.estado_actualizacion_app,
          fecha_actualizacion_app: res.fecha_actualizacion_app,
          estado_actualizacion_dominios: res.estado_actualizacion_dominios,
          fecha_actualizacion_dominios: res.fecha_actualizacion_dominios,
          sincronizacion_total: res.sincronizacion_total,
          id_cliente: res.id_cliente,
          id_pais: res.id_pais,
          id_licencia: res.id_licencia,
          plan_mecodex: res.plan_mecodex,
          id_usuario_sensei: res.id_usuario_sensei,
          fecha_creacion_cuenta: res.fecha_creacion_cuenta,
          fecha_modificacion: res.fecha_modificacion,
        }))
      })
    )
  }

  updateCuentaLicencia(id_licencia: number, id_cliente: any): Observable<CuentaInterface>{
    const url = new URL(this.ApiCuentaLicencia());
    url.searchParams.append('id_cliente', id_cliente.toString());
    url.searchParams.append('id_licencia', id_licencia.toString());

    return this.http.put<CuentaInterface>(url.toString(), {}).pipe(
      catchError((error) => {
        return throwError(() => new Error(error.message))
      })
    )
  }


}
