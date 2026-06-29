import { Component, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { CommonModule, NgComponentOutlet } from '@angular/common';
import { ReviewCardComponent } from '../global-review-card/review-card.component';
import { ItemReviewCardComponent } from '../item-reviews-card/item-reviews-card.component';

@Component({
  selector: 'app-review-viewer',
  standalone: true,
  imports: [
    CommonModule,
    NgComponentOutlet,
    ReviewCardComponent,
    ItemReviewCardComponent
  ],
  templateUrl: './review-viewer.component.html',
  styleUrls: ['./review-viewer.component.css']
})
export class ReviewViewerComponent {

  // -------------------------
  // INPUTS
  // -------------------------
  @Input() reviews: any[] = [];

  // Dynamic card component (ReviewCard or ItemReviewCard)
  @Input() cardComponent!: String;

  @Input() title: string = 'Reviews';
  @Input() isLoading: boolean = false;
  @Input() errorMessage: string = '';

  // -------------------------
  // OPTIONAL REFRESH CONTROL
  // -------------------------
  @Input() showRefresh: boolean = false;
  @Output() refresh = new EventEmitter<void>();

  // -------------------------
  // EVENTS
  // -------------------------

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['reviews']) {
      console.log('Reviews updated:', this.reviews);
    }
  }
  onRefresh(): void {
    this.refresh.emit();
    console.log(this.reviews)
  }
}