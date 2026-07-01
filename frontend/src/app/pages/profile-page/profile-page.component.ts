import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { ReviewViewerComponent } from '../../component/review/review-viewer/review-viewer.component';
import { Review } from '../../core/model/review/review.type';
import { ReviewService } from '../../core/service/review/review.service';
import { UserDTO, UserService } from '../../core/service/user/user.service';
import { UserListDialogComponent } from '../../component/user-list-dialog/user-list-dialog.component';
import { UiService } from '../../core/service/ui/ui.service';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [CommonModule, ReviewViewerComponent],
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {

  reviews: Review[] = [];
  user: UserDTO | null = null;
  currentUser: UserDTO | null = null;

  isFollowing = false;
  isLoading = false;
  errorMessage = '';
  cardComponent = 'ReviewCardComponent';

  constructor(
    private reviewService: ReviewService,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private userService: UserService,
    private ui: UiService
  ) {}

  ngOnInit(): void {

    // ✅ load logged-in user once
    this.userService.getMyProfile().subscribe(user => {
      this.currentUser = user;
    });

    // load profile user from route
    this.route.params.subscribe(params => {
      const username = params['username'];
      if (username) {
        this.loadUserProfile(username);
      }
    });
  }

  private loadUserProfile(username: string): void {
    this.userService.getUserByUsername(username).subscribe({
      next: user => {
        this.user = user;
        this.updateFollowingStatus();
        this.loadUserReviews();
      },
      error: err => console.error('Failed to load user:', err)
    });
  }

  loadUserReviews(): void {
    const username = this.user?.username || this.currentUser?.username;
    if (!username) return;

    this.isLoading = true;

    this.reviewService.getUserReviews(username).subscribe({
      next: (res) => {
        this.reviews = res ?? [];
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'Failed to load user reviews';
        this.reviews = [];
        this.isLoading = false;
      }
    });
  }

  private updateFollowingStatus(): void {
    if (this.currentUser && this.user) {
      this.isFollowing =
        this.currentUser.following?.includes(this.user.username) ?? false;
    } else {
      this.isFollowing = false;
    }
  }

  follow(): void {
    if (!this.currentUser || !this.user) return;

    this.userService.followUser(this.currentUser.username, this.user.username).subscribe({
      next: () => {
        this.isFollowing = true;
        this.currentUser!.following ??= [];
        this.currentUser!.following.push(this.user!.username);
      }
    });
  }

  unfollow(): void {
    if (!this.currentUser || !this.user) return;

    this.userService.unfollowUser(this.currentUser.username, this.user.username).subscribe({
      next: () => {
        this.isFollowing = false;

        this.currentUser!.following =
          this.currentUser!.following?.filter(f => f !== this.user!.username) ?? [];
      }
    });
  }

  openUserList(title: string, users: string[]): void {
    this.dialog.open(UserListDialogComponent, {
      data: { title, users }
    });
  }
}