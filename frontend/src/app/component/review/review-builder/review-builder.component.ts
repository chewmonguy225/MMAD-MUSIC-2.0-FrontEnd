import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Item } from '../../../core/model/item/item.type';
import { SearchBarComponent } from '../../search-bar/search-bar.component';
import { ReviewService } from '../../../core/service/review/review.service';
import { AuthService } from '../../../core/service/user/auth/auth.service';
@Component({
  selector: 'app-review-builder',
  standalone: true,
  imports: [CommonModule, SearchBarComponent, FormsModule],
  templateUrl: './review-builder.component.html',
  styleUrl: './review-builder.component.css'
})
export class ReviewBuilderComponent {

  // -------------------------
  // MODAL CONTROL (parent sync)
  // -------------------------
  @Input() isOpen = false;
  @Output() isOpenChange = new EventEmitter<boolean>();

  // -------------------------
  // STEP FLOW
  // -------------------------
  step: 'search' | 'rate' | 'text' = 'search';

  // -------------------------
  // REVIEW STATE
  // -------------------------
  selectedItem: Item | null = null;
  rating = 0;
  text = '';
  errorMessage: string = '';

  constructor(private reviewService: ReviewService, private authService: AuthService) {}

  // -------------------------
  // CLOSE MODAL
  // -------------------------
  close(): void {
    this.isOpen = false;
    this.isOpenChange.emit(false);
    this.reset();
  }

  reset(): void {
    this.step = 'search';
    this.selectedItem = null;
    this.rating = 0;
    this.text = '';
  }

  // -------------------------
  // ITEM SELECTED FROM SEARCH
  // -------------------------
  selectItem(item: Item): void {
    this.selectedItem = item;
    this.step = 'rate';
  }

  // -------------------------
  // STAR RATING
  // -------------------------
  setRating(star: number): void {
    this.rating = star;
    this.step = 'text';
  }

  // -------------------------
  // SUBMIT REVIEW
  // -------------------------
  submit(): void {
    if (!this.selectedItem) return;

    const currentUser = this.authService.getCurrentUser();
    if (!currentUser) {
      this.errorMessage = 'You must be logged in to post a review';
      return;
    }
    
    const payload = {
      username: currentUser.username,
      itemId: this.selectedItem.id!,
      rating: this.rating,
      description: this.text
    };

    console.log('🚀 Review payload:', payload);

    this.reviewService.createReview(payload).subscribe({
      next: (res) => {
        console.log('✅ Review saved:', res);
        this.close();
      },
      error: (err) => {
        console.error('❌ Failed to save review:', err);
      }
    });
  }
}