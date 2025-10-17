import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, map } from 'rxjs';
import {
  UsuariosInterface,
  UsuariosResponseInterface,
} from '../models/usuarios-interface';

@Injectable({
  providedIn: 'root',
})
export class UsuariosService {
  api = signal(environment.api_db);

  constructor(private http: HttpClient) {}

  // * Nota: Los datos de la interface, si no son opcionales, deben de ser incluidos en la solicitud.
  getUsuarios(): Observable<UsuariosInterface[]> {
  return this.http.get<UsuariosResponseInterface>(this.api()).pipe(
    map((res) => {
      return res.data.map((usuario: UsuariosInterface) => ({
        id: usuario.id,
        nombre: usuario.nombre,
        segundo_nombre: usuario.segundo_nombre,
        apellido: usuario.apellido,
        segundo_apellido: usuario.segundo_apellido,
        telefono: usuario.telefono,
        direccion: usuario.direccion,
        id_tipo_documento: usuario.id_tipo_documento,
        abreviatura: usuario.abreviatura,
        estado: usuario.estado,
        modo_conexion: usuario.modo_conexion,
        version_app: usuario.version_app,
        fecha_clasificacion: usuario.fecha_calificacion,
        calificacion: usuario.calificacion,
        mensaje_calificacion: usuario.mensaje_calificacion,
        documento: usuario.documento,
        fecha_expedicion: usuario.fecha_expedicion,
        correo: usuario.correo,
        id_pais: usuario.id_pais,
        pais_nombre: usuario.pais_nombre,
        PLAN_MECODEX: usuario.PLAN_MECODEX,
        observacion_cliente: usuario.observacion_cliente,
        observacion_comercial: usuario.observacion_comercial,
        observacion_soporte: usuario.observacion_soporte,
        observacion_cuenta: usuario.observacion_cuenta,
        fecha_creacion: usuario.fecha_creacion,
        id_usuario_sensei: usuario.id_usuario_sensei,
        fecha_modificacion: usuario.fecha_modificacion 
      }));
    })
  );
}
}
