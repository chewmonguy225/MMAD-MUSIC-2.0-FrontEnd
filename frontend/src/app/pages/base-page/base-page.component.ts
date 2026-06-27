import { Component, Input } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { RouterOutlet } from '@angular/router';
import { UserDTO } from '../../core/service/user/user.service';
import { AuthService } from '../../core/service/user/auth/auth.service';

@Component({
  selector: 'app-base-page',
  imports: [ 
    RouterOutlet,
    HeaderComponent,
  ],
  templateUrl: './base-page.component.html',
  styleUrl: './base-page.component.css'
})

export class BasePageComponent {
  constructor(protected authService: AuthService){}

  user: UserDTO | null = null;
  
  ngOnInit(): void {
    this.authService.currentUser$.subscribe(user => {
      this.user = user;
    });
  }
}
