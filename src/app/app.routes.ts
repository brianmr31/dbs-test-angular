import { Routes } from '@angular/router';

import { AddEmployeComponent } from './addemploye/addemploye.component';
import { EmployeComponent } from './employe/employe.component';
import { HomeComponent } from './home/home.component';


export const routeConfig: Routes = [
    {
        path: 'addemploye',
        component: AddEmployeComponent,
        title: "add Employe"
    },
    {
        path: 'employe',
        component: EmployeComponent,
        title: "Employe"
    },
    {
        path: 'home',
        component: HomeComponent,
        title: "Home"
    }
];
