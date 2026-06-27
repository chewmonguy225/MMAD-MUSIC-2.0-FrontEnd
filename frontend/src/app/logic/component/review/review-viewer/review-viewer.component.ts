// src/app/component/review-viewer/review-viewer.component.ts

import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReviewService } from '../../../service/review/review.service';
import { Review } from '../../../model/review.type';
import { HttpErrorResponse } from '@angular/common/http';
import { Item } from '../../../model/item/item.type';
import { ReviewCardComponent } from '../review-card/review-card.component';

@Component({
  selector: 'app-review-viewer',
  standalone: true,
  imports: [CommonModule, ReviewCardComponent],
  templateUrl: './review-viewer.component.html',
  styleUrl: './review-viewer.component.css'
})
export class ReviewViewerComponent{
  review: Review | null = null;
  item: Item | null = null;

  @Input() reviews: Review[] | null = null;
  isLoading: boolean = false;
  errorMessage: string | null = null;

  constructor(private reviewService: ReviewService) { }


  // --- END OF MAPPING FUNCTION ---


  viewAll(): void {
    this.reviewService.getAllReviews().subscribe({
      next: (reviews: Review[]) => {
        this.reviews = reviews;
        console.log('Reviews loaded:', this.reviews);
      },
      error: (error: HttpErrorResponse) => {
        console.error('Failed to load reviews:', error);
      },
      complete: () => {
        // optional cleanup logic
      }
    });
  }
  
}