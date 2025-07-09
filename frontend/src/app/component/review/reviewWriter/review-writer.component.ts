import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Item } from '../../../model/item/item.type'; // Assuming Item has an 'id' property

@Component({
  selector: 'app-review-writer',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './review-writer.component.html',
  styleUrls: ['./review-writer.component.css']
})
export class ReviewWriter {
  @Input() item: Item | null = null;  // Receive the item here

  // Renamed 'review' to 'description' for consistency with backend
  @Output() submitted = new EventEmitter<{ item: Item, description: string; rating: number }>();
  @Output() cancel = new EventEmitter<void>();

  // Renamed 'reviewText' to 'description' for internal consistency
  description = '';
  rating = 0;
  stars = [1, 2, 3, 4, 5];

  setRating(star: number): void {
    this.rating = star;
  }

  submit(): void {
    // Check if description has content and if an item is provided
    if (this.description.trim() && this.item) {
      this.submitted.emit({
        description: this.description.trim(), // Use the consistent name
        rating: this.rating,
        item: this.item // Emit the full item for the parent to extract ID
      });
      this.description = ''; // Reset form
      this.rating = 0;
    } else {
      console.error('Cannot submit review: description is empty or item is missing.');
      // TODO: Provide user feedback (e.g., a toast notification, visual error on form)
    }
  }

  cancelReview(): void {
    this.cancel.emit();
  }
}