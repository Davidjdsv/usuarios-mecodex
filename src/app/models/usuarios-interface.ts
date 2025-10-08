export interface UsuariosInterface {
    id: number;
    nombre: string;
    segundo_nombre: string;
    apellido: string;
    segundo_apellido: string;
    telefono: string;
    direccion: string;
    id_tipo_documento: number; // ID de la tabla tipo_documento... Debería de ser un objeto del tipo tipo_documento?
    documento: number;
    fecha_expedicion: string;
    correo: string;
    id_pais: number; // ID de la tabla paises... Debería de ser un objeto del tipo país?
    observacion_cliente: string;
    observacion_comercial: string;
    observacion_soporte: string;
    observacion_cuenta: string;
    fecha_creacion: string;
    id_usuario_sensei: number;
    fecha_modificacion: string;
}

export interface UsuariosResponseInterface {
    success: boolean;
    data: UsuariosInterface[];
}
