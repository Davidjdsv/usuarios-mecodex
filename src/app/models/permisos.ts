export interface PermisosInterface {
    id_permiso: number;
    id_modulo: number;
    nombre_permiso: string;
    descripcion_permiso: string;
    activo: number;
}

export interface PermisosDataInterface {
    general: PermisosInterface[];
}

export interface PermisosResponseInterface{
    success: boolean;
    data: PermisosDataInterface;
    total: number;
}
