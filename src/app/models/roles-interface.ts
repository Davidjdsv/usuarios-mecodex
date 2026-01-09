export interface RolesInterface {
    id_rol: number;
    nombre_rol: string;
    descripcion?: string;
    activo?: boolean;
}

export interface RolesResponseInterface{
    success: boolean;
    data: RolesInterface[];
    total: number;
}
