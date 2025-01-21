export interface MenuInterface {
    id: number;  // Indica si la operación fue exitosa o no
    name: string; // Mensaje de información o error
    father: string;   // Detalle del error, si existe
    route: string; // Fecha y hora en que ocurrió la operación
    ordemenu: string;  // Traza del error (si es necesario para depuración)
}

