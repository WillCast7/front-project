

export interface CustomerlistInterface {
    name: string;
    nit: string;
    actual: number;
    anterior1: number;
    anterior2: number;
    anterior3: number;
    city: string;
    asesor: string;
    completado: number;
}

export const CustomerInitializer: CustomerlistInterface = {
    name: '',
    nit: '',
    actual: 0,
    anterior1: 0,
    anterior2: 0,
    anterior3: 0,
    city: '',
    asesor: '',
    completado: 0
};
