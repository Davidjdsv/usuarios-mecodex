export interface UsuariosInterface {
    // Datos de la tabla cliente
    id: number;
    nombre: string;
    segundo_nombre: string;
    apellido: string;
    segundo_apellido: string;
    telefono: string;
    direccion: string;
    id_tipo_documento: number; // ID de la tabla tipo_documento... Debería de ser un objeto del tipo tipo_documento?
    documento: string;
    fecha_expedicion: string;
    correo: string;
    id_pais: number;
    pais_nombre: string; // ID de la tabla paises... Debería de ser un objeto del tipo país?
    observacion_cliente: string | null;
    observacion_comercial: string | null;
    observacion_soporte: string | null;
    observacion_cuenta: string | null;
    fecha_creacion: string;
    id_usuario_sensei?: number;
    fecha_modificacion?: string;

    //Datos de la tabla cuenta
    id_licencia?: number;
    PLAN_MECODEX: string;
    estado?: string;
    modo_conexion?: string;
    version_app?: string;
    fecha_calificacion?: string;
    mensaje_clasificacion?: string | null;
    calificacion?: number;

    // Datos de la tabla país
    pais_iso?: string;

    // Datos de la tabla tipo_documento
    tipo_documento_nombre?: string;
    tipo_documento_abreviatura?: string;

    // Datos de la tabla usuario_sensei
    usuario_sensei_nombre?: string;
}

export interface UsuariosResponseInterface {
    succes: boolean;
    data: UsuariosInterface[];
    total: number;
}
