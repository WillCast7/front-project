

export interface CustomerListNamesInterface {
    [key: string]: string;
    nit:string,
    name:string,
    anterior2:string,
    anterior1:string,
    actual:string,
    city:string,
    asesor:string,
    completado: string
}

export const CustomerListInitializer: CustomerListNamesInterface = {
    name: '',
    nit: '',
    actual: '',
    anterior1: '',
    anterior2: '',
    city: '',
    asesor: '',
    completado: ''
};
