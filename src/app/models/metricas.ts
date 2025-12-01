export interface metricasGenerales {
    success: true;
    data: {
        total_clientes: number;
        total_cuentas: number;
        estados_cuentas: {
            estado: string;
            total: number;
        }[];
        distribucion_clientes: {
            clientes_con_cuenta: number;
            clientes_sin_cuenta: number;
        };
        promedio_cuentas_por_cliente: number;
    }
}

export interface metricasPlanes {
    success: true,
    data: [
        {
            plan: string,

            total: number,
            porcentaje: number
        },
    ]
}

export interface metricasPaises {
    success: true,
    data: [
        {
            pais: string,
            total_cuentas: number,
            total_clientes: number,
            porcentaje_cuentas: string
        },
    ]
}

export interface metricasEvolucion{
    success: boolean;
    data: [
        {
            mes_num: number;
            mes_nombre: string;
            nuevos_clientes: number;
        }
    ]
}
