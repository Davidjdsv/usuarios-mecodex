export interface RolesInterface {
    id_rol: number;
    nombre_rol: string;
    descripcion?: string;
}

export interface RolesResponseInterface{
    success: boolean;
    data: RolesInterface[];
    total: number;
}
