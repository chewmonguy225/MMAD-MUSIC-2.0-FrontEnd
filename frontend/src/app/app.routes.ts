import { Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { BasePageComponent } from './pages/base-page/base-page.component';

import { HomePageComponent } from './pages/home-page/home-page.component';
import { ExplorePageComponent } from './pages/explore-page/explore-page.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { ItemPageComponent } from './pages/item-page/item-page.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },

  // PUBLIC
  {
    path: 'login',
    component: LoginComponent,
    title: 'Login'
  },

  // PROTECTED LAYOUT
  {
    path: '',
    component: BasePageComponent,
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
        path: 'myProfilePage',
        component: ProfilePageComponent,
        title: 'My Profile'
      },
      {
        path: 'profile/:username',
        component: ProfilePageComponent
      },
      {
        path: 'item/:id',
        component: ItemPageComponent
      }
    ]
  }
];