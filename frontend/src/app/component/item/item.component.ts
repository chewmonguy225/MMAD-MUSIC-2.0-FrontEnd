import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { ItemService } from '../../core/service/item/item/item.service';
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
  ) {}

  abstract onSpotifyClick(): void;

  // ✅ ADD THIS
  navigateToItemPage(): void {
    if (!this.item) return;

    this.router.navigate(['/item', this.item.sourceId]);
  }
}