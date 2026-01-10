export interface Permisos {
    id_permiso: number;
    id_modulo: number;
    nombre_permiso: string;
    descripcio_permiso: string;
    activo: number;
}

export interface PermisosResponseInterface{
    success: boolean;
    data: Permisos[];
    total: number;
}
