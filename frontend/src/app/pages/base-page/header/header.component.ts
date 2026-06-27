import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../core/service/user/auth/auth.service';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SearchBarComponent } from '../../../component/search-bar/search-bar.component';
import { ReviewBuilderComponent } from '../../../component/review/review-builder/review-builder.component';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NgIf, FormsModule, SearchBarComponent, ReviewBuilderComponent],  // <-- Add NgIf here
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  title = signal('MMAD');

  currentUsername = signal<string | null>(null);
  searchActive = false;
  searchQuery = '';

  constructor(private authService: AuthService) {
    this.currentUsername.set(this.authService.getCurrentUser()?.username ?? null);
  }

  toggleSearch() {
    this.searchActive = !this.searchActive;
  }

  performSearch() {
    console.log('Searching for:', this.searchQuery);
    // Add your search logic here
  }

  isModalOpen = false;

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

}
