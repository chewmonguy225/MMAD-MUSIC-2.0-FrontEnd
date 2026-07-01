import { Component, OnInit } from '@angular/core';

import { ReviewViewerComponent } from '../../component/review/review-viewer/review-viewer.component';
import { ReviewService } from '../../core/service/review/review.service';
import { Review } from '../../core/model/review/review.type';

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
  ) {}

  ngOnInit(): void {
    this.loadReviews();
  }

  loadReviews(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.reviewService.getAllReviews().subscribe({
      next: (plainReviews: Review[]) => {
        this.reviews = plainReviews ?? [];
        this.isLoading = false;

        console.log('Reviews received:', this.reviews);
      },

      error: (err) => {
        console.error('Failed to load reviews:', err);
        this.errorMessage = 'Failed to load reviews';
        this.reviews = [];
        this.isLoading = false;
      }
    });
  }
}