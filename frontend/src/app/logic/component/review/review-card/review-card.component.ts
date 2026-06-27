import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Review } from '../../../model/review.type';
import { Artist } from '../../../model/item/artist.type';
import { Item } from '../../../model/item/item.type';

@Component({
  selector: 'app-review-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './review-card.component.html',
  styleUrl: './review-card.component.css'
})
export class ReviewCardComponent {

  @Input() review!: Review;

  // -------------------------
  // TYPE GUARD
  // -------------------------
  isArtist(item: Item): item is Artist {
    return item.type === 'ARTIST';
  }

  // -------------------------
  // GETTERS
  // -------------------------
  get itemType(): string {
    return this.review?.item?.type || '';
  }

  get artist(): Artist | null {
    return this.review?.item && this.isArtist(this.review.item)
      ? this.review.item
      : null;
  }

  get stars(): number[] {
    return Array(this.review?.rating || 0);
  }
}