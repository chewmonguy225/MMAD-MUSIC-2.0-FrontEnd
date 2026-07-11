import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReviewViewerComponent } from '../../review/review-viewer/review-viewer.component';
import { ReviewService } from '../../../service/review/review.service';
import { UserService, UserDTO } from '../../../service/user/user.service';
import { UiService } from '../../../service/ui/ui.service';
import { Review } from '../../../core/model/review/review.type';
import { MatDialog } from '@angular/material/dialog';
import { UserListDialogComponent } from '../../user-list-dialog/user-list-dialog.component';
import { AuthService } from '../../../service/user/auth/auth.service';
@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [CommonModule, ReviewViewerComponent],
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {

  reviews: Review[] = [];
  currentUser: UserDTO | null = null;

  isLoading = false;
  errorMessage = '';
  cardComponent = 'ReviewCardComponent';

  // 👇 USER LIST STATE
  showUserList = false;
  listTitle: string | null = null;
  listUsers: string[] = [];

  constructor(
    private dialog: MatDialog,
    private reviewService: ReviewService,
    private userService: UserService,
    private ui: UiService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.userService.getMyProfile().subscribe(user => {
      this.currentUser = user;

      console.log(user);
      if (user?.username) {
        this.loadMyReviews(user.username);
      }
    });
  }

  loadMyReviews(username: string): void {
    this.isLoading = true;

    this.reviewService.getUserReviews(username).subscribe({
      next: (res) => {
        this.reviews = res ?? [];
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'Failed to load reviews';
        this.reviews = [];
        this.isLoading = false;
      }
    });
  }

  openUserList(title: string, users: string[]) {

    this.dialog.open(UserListDialogComponent, {
      width: '400px',
      data: {
        title,
        users
      }
    });

  }

  logout(): void {
    this.currentUser = null;
    this.authService.logout();
  }
}