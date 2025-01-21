import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDrawer, MatDrawerMode, MatSidenavModule } from '@angular/material/sidenav';
import { Router, RouterOutlet } from '@angular/router';
import { LoginComponent } from "../pages/login/login.component";
import { SessionService } from '../../services/session.service';
import { Subscription } from 'rxjs';
import { MenuItemInterface } from '../../models/menuItem-interface';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-sidenav',
  imports: [
    LoginComponent,
    MatButtonModule,
    MatSelectModule,
    MatFormFieldModule,
    MatSidenavModule,
    RouterOutlet,
    MatIconModule,
  ],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css'
})
export class SidenavComponent implements OnInit, OnDestroy {
  @ViewChild('drawer') drawer!: MatDrawer;
  drawerValue: MatDrawerMode = 'push'; // modes: side | over | push
  menu: MenuItemInterface[] = [];
  menuSubscription: Subscription | undefined;

  constructor(
    private readonly router: Router,
    private readonly sessionService: SessionService
  ) {}

  ngOnInit(): void {
      // Suscribirse al menuSubject para obtener el menú
      this.menuSubscription = this.sessionService.menuSubject.subscribe(menu => {
      this.menu = this.sessionService.menu;
    });
    
  }

  ngOnDestroy(): void {
    // Limpiar la suscripción cuando el componente se destruye
    if (this.menuSubscription) {
      this.menuSubscription.unsubscribe();
    }
  }

  logOut(): void {
    this.sessionService.logOut();
  }

  isSessionActive(): boolean {
    return this.sessionService.isSessionActive();
  }

  navigateTo(route: string): void {
    this.drawer.close();
    const accordions = document.querySelectorAll('.accordion-collapse');
    accordions.forEach((accordion) => {
      accordion.classList.remove('show'); // Cierra el acordeón
    });
    this.router.navigate([route]);
  }
 
}
