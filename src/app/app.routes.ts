import { Routes } from '@angular/router';
import { DashboardComponent } from './components/pages/dashboard/dashboard.component';
import { CustomersComponent } from './components/pages/mercadeo/customers/customers.component';

export const routes: Routes = [
    {path: '', component: DashboardComponent },
    {path: 'mercadeo/contactarclientes', component: CustomersComponent },
    {path: '**', redirectTo: '', pathMatch: 'full' }
];
