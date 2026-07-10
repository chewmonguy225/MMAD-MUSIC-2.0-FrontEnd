import { Component, OnInit } from '@angular/core';

import { ReviewViewerComponent } from '../../review/review-viewer/review-viewer.component';
import { ReviewService } from '../../../service/review/review.service';
import { Review } from '../../../core/model/review/review.type';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    ReviewViewerComponent
  ],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  reviews: Review[] = [];
  cardComponent = "ReviewCardComponent";
  isLoading = false;
  errorMessage = '';

  constructor(
    private reviewService: ReviewService
  ) { }

  ngOnInit(): void {
    this.loadReviews();
  }

  loadReviews(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.reviewService.getFeedReviews().subscribe({
      next: (reviews: Review[]) => {
        this.reviews = reviews ?? [];
        this.isLoading = false;
      },

      error: (err) => {
        console.error('Failed to load feed reviews:', err);
        this.errorMessage = 'Failed to load reviews';
        this.reviews = [];
        this.isLoading = false;
      }
    });
  }
}