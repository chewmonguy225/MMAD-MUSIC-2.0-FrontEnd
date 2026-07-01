import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';

import { Item } from '../../../core/model/item/item.type';
import { SearchBarComponent } from '../../search-bar/search-bar.component';
import { ReviewService } from '../../../core/service/review/review.service';
import { AuthService } from '../../../core/service/user/auth/auth.service';
import { UiService } from '../../../core/service/ui/ui.service';

@Component({
  selector: 'app-review-builder',
  standalone: true,
  imports: [CommonModule, SearchBarComponent, FormsModule],
  templateUrl: './review-builder.component.html',
  styleUrl: './review-builder.component.css'
})
export class ReviewBuilderComponent implements OnInit, OnDestroy {

  // -------------------------
  // STATE
  // -------------------------
  isOpen = false;

  step: 'search' | 'rate' | 'text' = 'search';

  selectedItem: Item | null = null;
  rating = 0;
  text = '';
  errorMessage = '';

  private sub?: Subscription;

  constructor(
    private reviewService: ReviewService,
    private authService: AuthService,
    private ui: UiService
  ) {}

  ngOnInit(): void {
    this.sub = this.ui.reviewOpen$.subscribe(open => {
      this.isOpen = open;

      if (open) {
        this.reset();

        const item = this.ui.selectedItem;
        if (item) {
          this.selectedItem = item;
          this.step = 'rate'; // skip search
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  close(): void {
    this.ui.closeReviewBuilder();
    this.reset();
  }

  reset(): void {
    this.step = 'search';
    this.selectedItem = null;
    this.rating = 0;
    this.text = '';
    this.errorMessage = '';
  }

  selectItem(item: Item): void {
    this.selectedItem = item;
    this.step = 'rate';
  }

  setRating(star: number): void {
    this.rating = star;
    this.step = 'text';
  }

  submit(): void {
    if (!this.selectedItem) return;
  
    const username = this.authService.getUsername();
  
    if (!username) {
      this.errorMessage = 'You must be logged in to post a review';
      return;
    }
  
    const payload = {
      itemId: this.selectedItem.id!,
      rating: this.rating,
      description: this.text
    };
  
    this.reviewService.createReview(payload).subscribe({
      next: () => this.close(),
      error: (err) => console.error('Failed to save review:', err)
    });
  }
}