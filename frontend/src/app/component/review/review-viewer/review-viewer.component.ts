// src/app/component/review-viewer/review-viewer.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReviewService } from '../../../service/review/review.service';
import { Review } from '../../../model/review.type';
import { HttpErrorResponse } from '@angular/common/http';
import { ArtistComponent } from '../../item/artist/artist.component';
import { Item } from '../../../model/item/item.type';
import { Artist } from '../../../model/item/artist.type';
@Component({
  selector: 'app-review-viewer',
  standalone: true,
  imports: [CommonModule, ArtistComponent],
  templateUrl: './review-viewer.component.html',
  styleUrl: './review-viewer.component.css'
})
export class ReviewViewerComponent implements OnInit {
  review: Review | null = null;
  item: Item | null = null;

  reviews: Review[] | null = null;
  isLoading: boolean = false;
  errorMessage: string | null = null;

  constructor(private reviewService: ReviewService) { }

  ngOnInit(): void {
    this.viewAll();
  }

  private mapJsonToReviewInstance(plainReview: any): Review {
    let itemInstance: Item;

    if (plainReview.item) {
      // IMPORTANT: If you have different item types (Artist, Album, Song),
      // you NEED logic here to determine which concrete class to instantiate.
      // For example, if your backend sends a 'itemType' field:
      // switch (plainReview.item.itemType) {
      //   case 'ARTIST': itemInstance = new Artist(...); break;
      //   case 'ALBUM': itemInstance = new Album(...); break;
      //   default: itemInstance = new Artist(...); // Fallback or throw error
      // }
      // For now, assuming Artist is the only or primary type based on your context.
      itemInstance = new Artist( // Ensure Artist constructor matches Item's
        plainReview.item.id,
        plainReview.item.sourceId,
        plainReview.item.name,
        plainReview.item.imageURL,
        plainReview.item.createdAt,
        plainReview.item.updatedAt
      );
    } else {
      itemInstance = new Artist(0, '', 'Unknown Item', '', '', ''); // Provide a dummy if item is null
    }

    // Return a new instance of your Review class
    return new Review(
      plainReview.id,
      plainReview.rating,
      plainReview.description,
      itemInstance, // Pass the instantiated Item
      plainReview.user, // UserDTO is likely just a plain object/interface, no need to instantiate unless it's a class
      plainReview.createdAt,
      plainReview.updatedAt
    );
  }
  // --- END OF MAPPING FUNCTION ---


  viewAll(): void {
    // ... (rest of viewAll setup) ...

    this.reviewService.getAllReviews().subscribe({
      next: (plainReviews: any[]) => {
        this.reviews = plainReviews.map(this.mapJsonToReviewInstance.bind(this));
      },
      error: (error: HttpErrorResponse) => {
        // ... (error handling) ...
      },
      complete: () => {
        // ... (complete logging) ...
      }
    });
  }
}