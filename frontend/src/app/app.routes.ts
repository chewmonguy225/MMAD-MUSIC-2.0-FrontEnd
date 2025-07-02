import { Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { authGuard } from './guard/auth.guard';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
    },
    {
        path: 'login', 
        component: LoginComponent,
        title: 'Login'
    },
    {
        path: 'dashboard',
        component:DashboardComponent,
        title: 'Dashboard',
        canActivate: [authGuard]
    }
];
