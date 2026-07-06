import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { ReviewViewerComponent } from '../../component/review/review-viewer/review-viewer.component';
import { ReviewService } from '../../core/service/review/review.service';
import { UserService, UserDTO } from '../../core/service/user/user.service';
import { Review } from '../../core/model/review/review.type';
import { UserListDialogComponent } from '../../component/user-list-dialog/user-list-dialog.component';

@Component({
  selector: 'app-user-profile-page',
  standalone: true,
  imports: [CommonModule, ReviewViewerComponent],
  templateUrl: './user-profile-page.component.html',
  styleUrls: ['./user-profile-page.component.css']
})
export class UserProfilePageComponent implements OnInit {

  user: UserDTO | null = null;
  currentUser: UserDTO | null = null;

  reviews: Review[] = [];
  isLoading = false;
  errorMessage = '';
  cardComponent = 'ReviewCardComponent';

  isFollowing = false;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private reviewService: ReviewService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {

    // ✅ load logged-in user
    this.userService.getMyProfile().subscribe(user => {
      this.currentUser = user;
      this.updateFollowState();
    });

    // ✅ load profile user
    this.route.params.subscribe(params => {
      const username = params['username'];
      if (username) {
        this.loadUser(username);
      }
    });
  }

  private loadUser(username: string): void {
    this.userService.getUserByUsername(username).subscribe({
      next: (res) => {
        this.user = res;
        this.updateFollowState();
        this.loadReviews(username);
      },
      error: () => {
        this.errorMessage = 'Failed to load profile';
      }
    });
  }

  // =========================
  // REVIEWS
  // =========================
  loadReviews(username: string): void {
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

  refreshReviews(): void {
    if (!this.user) return;
    this.loadReviews(this.user.username);
  }

  // =========================
  // FOLLOW LOGIC
  // =========================
  private updateFollowState(): void {
    if (!this.currentUser || !this.user) {
      this.isFollowing = false;
      return;
    }

    this.isFollowing =
      this.currentUser.following?.includes(this.user.username) ?? false;
  }

  follow(): void {
    if (!this.currentUser || !this.user) return;

    this.userService.followUser(
      this.currentUser.username,
      this.user.username
    ).subscribe({
      next: () => {
        this.isFollowing = true;

        this.currentUser!.following ??= [];
        this.currentUser!.following.push(this.user!.username);
      }
    });
  }

  unfollow(): void {
    if (!this.currentUser || !this.user) return;

    this.userService.unfollowUser(
      this.currentUser.username,
      this.user.username
    ).subscribe({
      next: () => {
        this.isFollowing = false;

        this.currentUser!.following =
          this.currentUser!.following?.filter(
            u => u !== this.user!.username
          ) ?? [];
      }
    });
  }

  // =========================
  // MODAL
  // =========================
  openUserList(title: string, users: string[]): void {
    this.dialog.open(UserListDialogComponent, {
      data: {
        title,
        users: users ?? []
      },
      width: '400px'
    });
  }
}