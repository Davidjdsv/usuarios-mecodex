export interface CuentaInterface {
    id: number;
    correo: string;
    estado: string; // 'confirmed', 'wait', 'suspended'
    gmail: string | null;
    idapp_sta: string;
    idapp_din: string;
    password: string;
    fecha: string; // En la BD es varchar(25), puede ser un timestamp string
    ultimo_salvado_datos: string | null;
    calificacion: number | null;
    mensaje_calificacion: string | null;
    fecha_calificacion: string | null;
    version_app: string | null;
    modo_conexion: string | null;
    fecha_actualizacion_modo_conexion: string | null;
    estado_confirmacion_dispositivo: string | null;
    fecha_confirmacion_dispositivo: string | null;
    estado_actualizacion_app: string | null;
    fecha_actualizacion_app: string | null;
    estado_actualizacion_dominios: string | null;
    fecha_actualizacion_dominios: string | null;
    sincronizacion_total: string | null;
    id_cliente: number;
    id_pais: number;
    id_licencia: number | null;
    plan_mecodex: string | null;
    id_usuario_sensei: number | null;
    fecha_creacion: string | null; // En la BD es date, pero en el SELECT se puede formatear como string
    fecha_modificacion: string; // timestamp
}

export interface CuentaResponseInterface {
    success: boolean;
    data: CuentaInterface[];
}
