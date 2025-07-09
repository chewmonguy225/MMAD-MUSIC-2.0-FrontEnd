import { Component, OnInit, Input } from '@angular/core';
import { ReviewService } from '../../../../service/review/review.service';
import { Item } from '../../../../model/item/item.type'; // Assuming Item has an 'id' property
import { User } from '../../../../model/user.type';     // Assuming User has an 'id' property
import { Review, CreateReviewPayload } from '../../../../model/review.type'; // Corrected import for payload
import { ReviewWriter } from '../../reviewWriter/review-writer.component'; // Your child review input component
import { AuthService } from '../../../../service/auth/auth.service';
import { CommonModule } from '@angular/common';
// import { ArtistService } from '../../../../service/item/artist/artist.service'; // Likely not needed here
// import { Artist } from '../../../../model/item/artist.type'; // Likely not needed here

@Component({
  selector: 'app-review-complete',
  standalone: true,
  templateUrl: './review-complete.component.html',
  styleUrls: ['./review-complete.component.css'],
  imports: [ReviewWriter, CommonModule]
})
export class ReviewCompleteComponent implements OnInit {
  @Input() item: Item | null = null; // Input to receive the item for which the review is being written

  currentUser: User | null = null;
  loading = false;
  message = '';
  showReviewInput = false; // Controls visibility of the review input form

  constructor(
    private reviewService: ReviewService,
    private authService: AuthService,
    // private artistService: ArtistService // Remove if you don't save Artist here
  ) {}

  ngOnInit() {
    this.currentUser = this.authService.getCurrentUser();
    // Potentially load reviews for this item here if you want to display them
    // E.g., if (this.item) { this.reviewService.getReviewsByItemId(this.item.id).subscribe(...) }
  }

  // Type the data argument to match ReviewComponent's output
  onReviewSubmitted(data: { item: Item, description: string; rating: number }) {
    // Basic pre-submission validation
    if (!this.item || !this.currentUser || !data.item.id) {
      this.message = 'Error: User ID, item ID, or review data is missing for submission.';
      console.error('Review submission failed: Missing user ID, item ID, or review data.', {
        item: this.item,
        currentUser: this.currentUser,
        submittedData: data
      });
      return;
    }

    this.loading = true;
    this.message = '';

    // --- CRITICAL CORRECTION HERE ---
    // Construct the payload exactly as your backend's CreateReviewPayload expects
    const newReviewPayload: CreateReviewPayload = { // Use the correct interface
      itemId: data.item.id,       // Backend expects itemId (number), not a nested item object or SourceId
      rating: data.rating,
      description: data.description, // Use 'description' for consistency with backend
    };

    // --- REVIEW THIS LOGIC ---
    // this.artistService.saveArtist(this.item);
    // This line implies you might be trying to save the Artist *before* saving the review.
    // In a typical review scenario, the Item (Artist) should already exist in the database.
    // If you need to create/update an Artist *and* then review it, that's a separate flow.
    // For now, I recommend removing this line unless you have a very specific reason for it
    // that ties into the review creation itself (e.g., if a user reviews a NEW artist they just added).
    // If you keep it, ensure it's handled asynchronously and its success is guaranteed before reviewService.saveReview.
    // For a standard review, the item ID should already exist.

    this.reviewService.saveReview(newReviewPayload).subscribe({ // Call createReview from service
      next: (savedReview) => {
        this.message = 'Review saved successfully!';
        this.loading = false;
        this.showReviewInput = false; // Hide the form after success
        // TODO: You might want to refresh the list of reviews displayed for this item here
      },
      error: (err) => {
        this.message = 'Failed to save review. Please try again.';
        this.loading = false;
        console.error('Error saving review:', err);
        // TODO: Provide more specific user feedback based on err.status (e.g., 404, 409)
      }
    });
  }

  onReviewCancelled() {
    this.showReviewInput = false;
    this.message = 'Review submission cancelled.';
  }

  // Method to open the review input form (e.g., triggered by a button click in HTML)
  openReviewForm(): void {
    if (this.currentUser) {
      this.showReviewInput = true;
      this.message = ''; // Clear previous messages
    } else {
      this.message = 'Please log in to write a review.';
      // TODO: Redirect to login or show login prompt
    }
  }
}