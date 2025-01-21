import { MenuInterface } from "./menu-interface";

export interface AuthInterface {
    jwt: string;
    username: string;
    menus: MenuInterface[];
}

