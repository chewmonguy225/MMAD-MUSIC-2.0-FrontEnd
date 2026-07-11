import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { ItemService } from '../../service/item/item/item.service';
import { Item } from '../../core/model/item/item.type';

@Component({
  selector: 'app-item',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './item.component.html',
  styleUrl: './item.component.css'
})
export abstract class ItemComponent {

  @Input() item: Item | null = null;

  showReviewButton = false;
  showReviewInput = false;

  constructor(
    protected itemService: ItemService,
    protected router: Router
  ) { }

  /**
   * Creates the item in the backend if necessary,
   * then navigates to its item page.
   */
  onItemClick(): void {

    if (!this.item) {
      return;
    }

    this.itemService
      .getOrCreateItem(this.item)
      .subscribe({

        next: (savedItem) => {

          if (savedItem.id != null) {
            this.router.navigate(['/item', savedItem.id]);
          }
        },

        error: (err) => {
          console.error('Failed to open item page:', err);
        }

      });
  }

  abstract onSpotifyClick(): void;

}