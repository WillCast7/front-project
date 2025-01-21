import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root',
})
export class MenuService {
    public groupByFather(items: any[]): any[] {
        const groupedMenu = items.reduce((acc, currentItem) => {
        const { father } = currentItem;
        if (!acc[father]) {
            acc[father] = []; // Si no existe, inicializamos un array vacío para ese padre
        }
        acc[father].push(currentItem); // Agregamos el item al array correspondiente
        return acc;
        }, {});

        // Convertimos el objeto agrupado en un array de objetos
        return Object.keys(groupedMenu).map(father => ({
        father,
        children: groupedMenu[father] // Los elementos hijos
        }));
    }
}