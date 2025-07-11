import { Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { authGuard } from './guard/auth.guard'; // Ensure correct path to your guard
import { HomeComponent } from './component/home/home.component';
import { SearchBarComponent } from './component/dashboard/search-bar/search-bar.component';
export const routes: Routes = [
    {
        // This route will now try to go to the dashboard first.
        // If the user isn't logged in, the authGuard on '/dashboard'
        // will then redirect them to '/login'.
        path: '',
        redirectTo: '/dashboard', // <-- CHANGE THIS TO YOUR PROTECTED HOME ROUTE
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: LoginComponent,
        title: 'Login'
    },
    {
        path: 'dashboard',
        component: DashboardComponent,
        title: 'Dashboard',
        canActivate: [authGuard] // Keep this protected
    },
    {
        path: 'home',
        component: HomeComponent,
        title: 'Home'
    },
    {
        path: 'explore',
        component: SearchBarComponent,
        title: 'Explore'
    },

];