import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Item } from '../model/item/item.type';

@Component({
  selector: 'app-review',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <textarea [(ngModel)]="reviewText" placeholder="Write your review..."></textarea>
    <button (click)="submit()">Submit</button>
    <button (click)="cancel.emit()">Cancel</button>
  `
})
export class ReviewComponent {
  @Input() item: Item | null = null;
  @Output() submitted = new EventEmitter<string>();
  @Output() cancel = new EventEmitter<void>();

  reviewText = '';

  submit() {
    if (this.reviewText.trim()) {
      this.submitted.emit(this.reviewText.trim());
      this.reviewText = '';
    }
  }
}
