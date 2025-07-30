import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../logic/service/user/auth/auth.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NgIf],  // <-- Add NgIf here
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  title = signal('MMAD');

  currentUsername = signal<string | null>(null);

  constructor(private authService: AuthService) {
    this.currentUsername.set(this.authService.getCurrentUser()?.username ?? null);
  }

  
}
