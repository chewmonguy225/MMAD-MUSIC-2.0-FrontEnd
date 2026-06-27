import { Component, OnInit } from '@angular/core';
import { ReviewViewerComponent } from '../../logic/component/review/review-viewer/review-viewer.component';
import { BasePageComponent } from '../base-page/base-page.component';
import { AuthService } from '../../logic/service/user/auth/auth.service';
import { ReviewService } from '../../logic/service/review/review.service';
import { Review } from '../../logic/model/review.type';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    BasePageComponent,
    ReviewViewerComponent
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent extends BasePageComponent implements OnInit {

  reviews: Review[] | null = null;

  constructor(
    private reviewService: ReviewService,
    authService: AuthService
  ) {
    super(authService);
  }

  override ngOnInit(): void {
    super.ngOnInit?.();

    this.reviewService.getAllReviews().subscribe({
      next: (plainReviews: Review[]) => {
        // ✅ NO transformation needed anymore
        this.reviews = plainReviews;

        console.log('User reviews received:', this.reviews);
      },
      error: (err) => console.error('Failed to load user reviews:', err)
    });
  }
}