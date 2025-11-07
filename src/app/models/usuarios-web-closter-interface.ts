export interface UsuariosWebClosterInterface {
    id_usuario_wc: number;
    nombre_completo: string;
    documento: string;
    contacto: string;
    correo: string;
    id_rol_usuario: number;
    nombre_usuario: string;
    contrasena: string;
}

export interface UsuariosWebClosterResponseInterface{
    success: boolean;
    data: UsuariosWebClosterInterface[];
    total: number;
}
