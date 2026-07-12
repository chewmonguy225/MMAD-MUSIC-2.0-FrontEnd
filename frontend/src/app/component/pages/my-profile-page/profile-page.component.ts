import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReviewViewerComponent } from '../../review/review-viewer/review-viewer.component';
import { ReviewService } from '../../../service/review/review.service';
import { UserService, UserDTO } from '../../../service/user/user.service';
import { Review } from '../../../core/model/review/review.type';
import { MatDialog } from '@angular/material/dialog';
import { UserListDialogComponent } from '../../user-list-dialog/user-list-dialog.component';
import { AuthService } from '../../../service/user/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [
    CommonModule,
    ReviewViewerComponent
  ],
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {

  reviews: Review[] = [];
  currentUser: UserDTO | null = null;
  isLoading = false;
  errorMessage = '';
  cardComponent = 'ReviewCardComponent';

  constructor(
    private dialog: MatDialog,
    private reviewService: ReviewService,
    private userService: UserService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userService.getMyProfile()
      .subscribe({
        next: (user) => {
          this.currentUser = user;

          console.log(user);

          if (user?.username) {
            this.loadMyReviews(user.username);
          }
        },
        error: () => {
          this.errorMessage = 'Failed to load profile';
        }
      });
  }

  loadMyReviews(username: string): void {
    this.isLoading = true;

    this.reviewService.getUserReviews(username)
      .subscribe({
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

  openUserList(title: string, users: string[]): void {
    this.dialog.open(UserListDialogComponent, {
      width: '400px',
      data: {
        title,
        users: users ?? []
      }
    });
  }

  logout(): void {
    this.currentUser = null;
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }
}