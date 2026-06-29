import { Component, Input } from '@angular/core';
import { ItemReviewViewModel } from '../../../core/model/review/ItemReviewsResponse';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-item-review-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './item-reviews-card.component.html',
  styleUrl: './item-reviews-card.component.css'
})
export class ItemReviewCardComponent {

  @Input() review!: ItemReviewViewModel;

  get stars(): number[] {
    return Array(this.review?.rating || 0);
  }
}
