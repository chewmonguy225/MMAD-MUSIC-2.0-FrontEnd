import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../core/service/user/auth/auth.service';
import { NgIf, AsyncPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SearchBarComponent } from '../../../component/search-bar/search-bar.component';
import { ReviewBuilderComponent } from '../../../component/review/review-builder/review-builder.component';
import { UiService } from '../../../core/service/ui/ui.service';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NgIf, FormsModule],  // <-- Add NgIf here
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  title = signal('MMAD');

  currentUsername = signal<string | null>(null);
  searchQuery = '';

  constructor(private authService: AuthService, public ui:UiService) {
    this.currentUsername.set(this.authService.getCurrentUser()?.username ?? null,
    );
  }
  
  performSearch() {
    console.log('Searching for:', this.searchQuery);
    // Add your search logic here
  }


  openModal() {
    this.ui.openReviewBuilder();
  }

  closeModal() {
    this.ui.closeReviewBuilder();
  }


}
