import { Component, Input } from '@angular/core';
import { ItemService } from '../../service/item/item.service';
import { Item } from '../../model/item/item.type';
import { CommonModule } from '@angular/common'; // Already imported
import { FormsModule } from '@angular/forms'; // Already imported
import { ReviewWriter } from '../review/reviewWriter/review-writer.component'; // Your ReviewWriter component

@Component({
  selector: 'app-item',
  imports: [FormsModule, CommonModule, ReviewWriter],
  templateUrl: './item.component.html',
  styleUrl: './item.component.css'
})
export abstract class ItemComponent { // It's an abstract class, which is fine
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
    this.showReviewButton = false; // Optionally hide the "Write a Review" button once the input shows
  }

  onReviewSubmitted(data: { item: Item; description: string; rating: number }): void {
    console.log('Review submitted from ReviewWriter:', data.item, data.description, data.rating);
    this.showReviewInput = false; // Hide the review form
    this.showReviewButton = true; // Show the review button again (or hide completely)
  }

  onReviewCancelled(): void {
    console.log('Review submission cancelled.');
    this.showReviewInput = false;
    this.showReviewButton = true; // Show the review button again
  }
}