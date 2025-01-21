import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from './alerts.service';
import { MenuInterface } from '../models/menu-interface';
import { BehaviorSubject } from 'rxjs';
import { MenuService } from './menu.service';
import { MenuItemInterface } from '../models/menuItem-interface';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(private router: Router, private menuService: MenuService, private alertService: AlertService) { }

  public menuSubject: BehaviorSubject<MenuItemInterface[]> = new BehaviorSubject<MenuItemInterface[]>([]);

    // Almacenar sesión, incluyendo el JWT, nombre de usuario y menú en localStorage
    storeSession(username: string, menu: Array<MenuInterface>, jwtToken: string) {
      const newMenu = this.menuService.groupByFather(menu);  // Agrupar menú por padre
      localStorage.setItem('isLogged', 'true');
      localStorage.setItem('currentUser', username);
      localStorage.setItem('menu', JSON.stringify(newMenu));
      localStorage.setItem('jwt', jwtToken);  // Almacenar JWT token en localStorage
      
      // Guardar el menú también en el menúSubject para que esté disponible globalmente
      this.menuSubject.next(newMenu);
    }

  // Getter para obtener el menú
  get menu(): MenuItemInterface[] {
    if (this.menuSubject.value.length === 0) {
      // Si el menú no está cargado, lo obtenemos del localStorage
      const storedMenu = localStorage.getItem('menu');
      if (storedMenu) {
        this.menuSubject.next(JSON.parse(storedMenu)); 
      }

    }
    return this.menuSubject.value;
  }

  // Verifica si el JWT token está presente en localStorage
  isAuthenticated(): boolean {
    const token = this.getTokenFromLocalStorage('jwt');
    console.log('Token JWT encontrado:', token);
    return !!token;  // Devuelve true si existe un token
  }

  // Verifica si la sesión está activa y el token no está expirado
  isSessionActive(): boolean {
    const token = this.getTokenFromLocalStorage('jwt');
    return token != null && !this.isTokenExpired();
  }

  // Cerrar sesión (limpiar localStorage)
  logOut(): void {
    localStorage.clear();  // Limpia todo el almacenamiento local
    this.router.navigate(['/']);  // Redirige al login
  }

  // Obtener el JWT token del localStorage
  getTokenFromLocalStorage(key: string): string | null {
    return localStorage.getItem(key);  // Recupera el JWT desde el localStorage
  }

  // Verificar si el token está caducado (utiliza la información de expiración del JWT)
  isTokenExpired(): boolean {
    const token = this.getTokenFromLocalStorage('jwt');
    if (token) {
      const decoded = this.decodeJwt(token);
      return decoded.exp * 1000 < Date.now();  // Expira si el timestamp de expiración es menor que el tiempo actual
    }
    return true;  // Si no hay token, consideramos que está expirado
  }

  // Decodificar JWT (sin validación)
  decodeJwt(token: string): any {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
  }

  // Redirigir al login si no está autenticado o si la sesión ha expirado
  redirectToLogin() {
    this.router.navigate(['/']);
  }

  // Verificar si el usuario está autenticado y redirigir si no lo está
  checkAuth() {
    if (!this.isSessionActive()) {
      this.logOut();  // Si no está autenticado o la sesión expiró, cerrar sesión
      this.redirectToLogin();  // Redirigir al login
    }
  }
}
