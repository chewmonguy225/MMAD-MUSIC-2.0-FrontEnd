import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Review } from '../../../core/model/review/review.type';
import { ReviewCardComponent } from '../review-card/review-card.component';

@Component({
  selector: 'app-review-viewer',
  standalone: true,
  imports: [
    CommonModule,
    ReviewCardComponent
  ],
  templateUrl: './review-viewer.component.html',
  styleUrls: ['./review-viewer.component.css']
})
export class ReviewViewerComponent {

  // -------------------------
  // INPUTS (DATA ONLY)
  // -------------------------
  @Input() reviews: Review[] = [];
  @Input() title: string = 'Reviews';
  @Input() isLoading: boolean = false;
  @Input() errorMessage: string = '';

  // -------------------------
  // OPTIONAL: REFRESH ACTION (controlled by parent)
  // -------------------------
  @Input() showRefresh: boolean = false;
  @Output() refresh = new EventEmitter<void>();

  // -------------------------
  // UI ACTIONS
  // -------------------------
  onRefresh(): void {
    this.refresh.emit();
  }
}