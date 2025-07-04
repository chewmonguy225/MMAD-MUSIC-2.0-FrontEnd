import { Component, Input } from '@angular/core';
import { ItemService } from '../../service/item/item.service';
import { Item } from '../../model/item/item.type';
import { catchError, of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ReviewComponent } from '../../review/review.component';

@Component({
  selector: 'app-item',
  imports: [CommonModule, ReviewComponent],
  templateUrl: './item.component.html',
  styleUrl: './item.component.css'
})

export abstract class ItemComponent {
  @Input() item: Item | null = null;
  showReviewButton = false;
  showReviewInput = false;

  constructor(private itemService: ItemService) { }

  abstract onSpotifyClick(): void;


  onImageClick(): void {
    this.showReviewButton = !this.showReviewButton;
    if (!this.showReviewButton) this.showReviewInput = false;
  }

  writeReview(): void {
    this.showReviewInput = true;
  }
  
}


