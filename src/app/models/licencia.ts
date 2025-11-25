export interface LicenciaInterface {
    id: number;
    nombre: string;
    urlbackup: string;
}

export interface LicenciaResponseInterface{
    success: boolean;
    data: LicenciaInterface[];
    total: number;
}
