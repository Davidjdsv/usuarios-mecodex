export interface UsuariosInterface {
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
    PLAN_MECODEX: string;
    observacion_cliente: string | null;
    observacion_comercial: string | null;
    observacion_soporte: string | null;
    observacion_cuenta: string | null;
    fecha_creacion: string;
    id_usuario_sensei?: number;
    fecha_modificacion?: string;
    id_licencia?: number;
    pais_iso?: string;
    tipo_documento_nombre?: string;
    tipo_documento_abreviatura?: string;
    usuario_sensei_nombre?: string;
}

export interface UsuariosResponseInterface {
    succes: boolean;
    data: UsuariosInterface[];
    total: number;
}
