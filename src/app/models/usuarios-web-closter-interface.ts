// Add activo field to interface to match backend changes
export interface UsuariosWebClosterInterface {
    id_usuario_wc: number;
    nombre_completo: string;
    documento: string;
    contacto: string;
    correo: string;
    activo: number; // 1 para activo, 0 para inactivo
    id_rol_usuario: number;
    nombre_usuario: string;
    contrasena: string;
    id_tipo_documento: number;
    created_at: string;
    updated_at: string;
    abreviatura: string;
    permisos: number[];
}

// Para LOGIN (un solo usuario)
export interface LoginResponseInterface {
    success: boolean;
    message: string;
    token: string;
    data: UsuariosWebClosterInterface;
}

export interface UsuariosWebClosterResponseInterface{
    success: boolean;
    message: string;
    token: string;
    data: UsuariosWebClosterInterface[];
    total: number;
}
