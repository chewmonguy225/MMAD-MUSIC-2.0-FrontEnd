import { Routes } from '@angular/router';

import { LoginComponent } from './component/pages/login-pages/login-page/login.component';
import { VerifyPageComponent } from './component/pages/login-pages/verify-page/verify-page/verify-page.component';
import { BasePageComponent } from './component/pages/base-page/base-page.component';

import { HomePageComponent } from './component/pages/home-page/home-page.component';
import { ExplorePageComponent } from './component/pages/explore-page/explore-page.component';
import { ProfilePageComponent } from './component/pages/my-profile-page/profile-page.component';
import { ItemPageComponent } from './component/pages/item-page/item-page.component';
import { UserProfilePageComponent } from './component/pages/user-profile-page/user-profile-page.component';
import { ForgotPasswordPageComponent } from './component/pages/login-pages/forgot-password-page/forgot-password-page/forgot-password-page.component';
import { ResetPasswordPageComponent } from './component/pages/login-pages/reset-password-page/reset-password-page/reset-password-page.component';
import { authGuard } from './core/guards/auth/auth.guard';
import { guestGuard } from './core/guards/guest/guest.guard';

export const routes: Routes = [

  // Redirect root
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },


  // Login page
  {
    path: 'login',
    component: LoginComponent,
    title: 'Login',
    canActivate: [guestGuard]
  },

  {
    path: 'forgot-password',
    component: ForgotPasswordPageComponent,
    title: 'Forgot Password',
    canActivate: [guestGuard]
  },

  {
    path: 'reset-password',
    component: ResetPasswordPageComponent,
    title: 'Reset Password',
    canActivate: [guestGuard]
  },

  // Email verification page
  {
    path: 'verify',
    component: VerifyPageComponent,
    title: 'Verify Account'
  },


  // Protected pages
  {
    path: '',
    component: BasePageComponent,
    canActivate: [authGuard],
    children: [

      {
        path: 'home',
        component: HomePageComponent,
        title: 'Home'
      },

      {
        path: 'explore',
        component: ExplorePageComponent,
        title: 'Explore'
      },

      {
        path: 'me',
        component: ProfilePageComponent,
        title: 'My Profile'
      },

      {
        path: 'profile/:username',
        component: UserProfilePageComponent,
        title: 'User Profile'
      },

      {
        path: 'item/:id',
        component: ItemPageComponent,
        title: 'Item'
      }

    ]
  },


  // Catch-all route
  {
    path: '**',
    redirectTo: 'home'
  }

];