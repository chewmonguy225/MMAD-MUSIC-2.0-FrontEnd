import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { BasePageComponent } from '../base-page/base-page.component';
import { ReviewViewerComponent } from '../../component/review/review-viewer/review-viewer.component';

import { ItemReviewViewModel } from '../../core/model/review/ItemReviewsResponse';
import { ReviewService } from '../../core/service/review/review.service';
import { AuthService } from '../../core/service/user/auth/auth.service';
import { UiService } from '../../core/service/ui/ui.service';
import { Item } from '../../core/model/item/item.type';
import { ItemService } from '../../core/service/item/item/item.service';

@Component({
  selector: 'app-item-page',
  standalone: true,
  imports: [
    BasePageComponent,
    CommonModule,
    ReviewViewerComponent
  ],
  templateUrl: './item-page.component.html',
  styleUrls: ['./item-page.component.css']
})
export class ItemPageComponent extends BasePageComponent implements OnInit {

  reviews: ItemReviewViewModel[] = [];
  item: Item | null = null;
  itemId: number | null = null;

  cardComponent = "ItemReviewCardComponent";

  isLoading = false;
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private reviewService: ReviewService,
    authService: AuthService,
    ui: UiService,
    private itemService: ItemService
  ) {
    super(authService, ui);
  }

  override ngOnInit(): void {
    super.ngOnInit?.();

    this.route.params.subscribe(params => {
      const id = Number(params['id']);
      if (!id) return;

      this.itemId = id;

      const stateItem = history.state?.item as Item | undefined;

      if (stateItem && stateItem.id === id) {
        this.item = stateItem;
      } else {
        this.loadItem(id);
      }

      this.loadItemReviews(id);
    });
  }

  loadItem(id: number): void {
    this.itemService.getItemById(id).subscribe({
      next: (res) => this.item = res,
      error: (err) => console.error('Failed to load item', err)
    });
  }

  loadItemReviews(id: number): void {
    this.isLoading = true;

    this.reviewService.getReviewsByItemId(id).subscribe({
      next: (res: any) => {
        this.reviews = res?.reviews ?? [];
        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = 'Failed to load item reviews';
        this.reviews = [];
        this.isLoading = false;
      }
    });
  }

  // ⭐ NEW: open review modal from this item
  openReviewModal(): void {
    if (!this.item) return;
    this.ui.openReviewBuilder(this.item);
  }
}