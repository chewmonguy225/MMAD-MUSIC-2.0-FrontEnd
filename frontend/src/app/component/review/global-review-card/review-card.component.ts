import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Review } from '../../../core/model/review/review.type';
import { Artist } from '../../../core/model/item/artist.type';
import { Item } from '../../../core/model/item/item.type';

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
    return item.type === 'artist';
  }

  // -------------------------
  // TYPE HELPERS
  // -------------------------
  isAlbum(item: Item): boolean {
    return item.type === 'album';
  }

  // -------------------------
  // GETTERS
  // -------------------------

  get item(): Item | null {
    return this.review?.item ?? null;
  }

  get itemType(): string {
    return this.review?.item?.type || '';
  }

  get itemName(): string {
    return this.review?.item?.name || '';
  }

  get itemImage(): string {
    return this.review?.item?.imageURL || '';
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