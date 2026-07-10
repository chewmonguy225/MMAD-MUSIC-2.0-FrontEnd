import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReviewViewerComponent } from '../../review/review-viewer/review-viewer.component';
import { ReviewService } from '../../../service/review/review.service';
import { UserService, UserDTO } from '../../../service/user/user.service';
import { UiService } from '../../../service/ui/ui.service';
import { Review } from '../../../core/model/review/review.type';
import { MatDialog } from '@angular/material/dialog';
import { UserListDialogComponent } from '../../user-list-dialog/user-list-dialog.component';

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
    private reviewService: ReviewService,
    private userService: UserService,
    private ui: UiService
  ) {}

  ngOnInit(): void {
    this.userService.getMyProfile().subscribe(user => {
      this.currentUser = user;

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

  openUserList(type: string, users: string[]): void {
    console.log('CLICK:', type, users);

    this.listTitle = type;
    this.listUsers = users ?? [];
    this.showUserList = true;
  }
}