import { Component, OnInit } from '@angular/core';
import { ReviewViewerComponent } from '../../component/review/review-viewer/review-viewer.component';
import { BasePageComponent } from '../base-page/base-page.component';
import { AuthService } from '../../core/service/user/auth/auth.service';
import { ReviewService } from '../../core/service/review/review.service';
import { Review } from '../../core/model/review/review.type';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    BasePageComponent,
    ReviewViewerComponent
  ],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent extends BasePageComponent implements OnInit {

  reviews: Review[] = [];

  isLoading: boolean = false;
  errorMessage: string = '';

  constructor(
    private reviewService: ReviewService,
    authService: AuthService
  ) {
    super(authService);
  }

  override ngOnInit(): void {
    super.ngOnInit?.();

    this.loadReviews();
  }

  loadReviews(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.reviewService.getAllReviews().subscribe({
      next: (plainReviews: Review[]) => {
        this.reviews = plainReviews ?? []; // extra safety
        this.isLoading = false;

        console.log('Reviews received:', this.reviews);
      },

      error: (err) => {
        console.error('Failed to load reviews:', err);
        this.errorMessage = 'Failed to load reviews';
        this.reviews = []; // prevent UI crash
        this.isLoading = false;
      }
    });
  }
}