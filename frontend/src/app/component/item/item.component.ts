import { Component, Input } from '@angular/core';
import { ItemService } from '../../service/item/item.service';
import { Item } from '../../model/item/item.type';
import { catchError, of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReviewComponent } from '../review/reviewWriter/review.component';

@Component({
  selector: 'app-item',
  imports: [FormsModule, CommonModule, ReviewComponent],
  templateUrl: './item.component.html',
  styleUrl: './item.component.css'
})

export abstract class ItemComponent {
  @Input() item: Item | null = null;

  showReviewButton = false;
  showReviewInput = false;

  constructor(protected itemService: ItemService) {}

  abstract onSpotifyClick(): void;

  onImageClick(): void {
    this.showReviewButton = !this.showReviewButton;
    if (!this.showReviewButton) {
      this.showReviewInput = false;
    }
  }

  writeReview(): void {
    this.showReviewInput = true;
  }

  onReviewSubmitted(data: { review: string; rating: number }): void {
    console.log(data.review, data.rating);
    this.showReviewInput = false;
    this.showReviewButton = false;
  }
  

  onReviewCancelled(): void {
    this.showReviewInput = false;
  }
}



