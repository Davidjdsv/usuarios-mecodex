// Para múltiples usuarios
export interface UsuariosWebClosterInterface {
    id_usuario_wc: number;
    nombre_completo: string;
    documento: string;
    contacto: string;
    correo: string;
    id_rol_usuario: number;
    nombre_usuario: string;
    contrasena: string;
    id_tipo_documento: number;
    abreviatura: string;
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
