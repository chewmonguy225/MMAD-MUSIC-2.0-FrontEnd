import { Component, Input, OnInit } from '@angular/core'; // <-- Ensure OnInit is here
import { CommonModule } from '@angular/common';

// Import all possible item components that might be rendered via ngSwitch
import { ArtistComponent } from '../../item/artist/artist.component';
import { AlbumComponent } from '../../item/album/album.component';
import { SongComponent } from '../../item/song/song.component';

import { Review } from '../../../model/review.type';
import { Album } from '../../../model/item/album.type';
import { Artist } from '../../../model/item/artist.type';
import { Song } from '../../../model/item/song.type';

@Component({
  selector: 'app-review-card',
  standalone: true,
  // Ensure all item components are imported here for ngSwitchCase
  imports: [CommonModule, ArtistComponent, AlbumComponent, SongComponent],
  templateUrl: './review-card.component.html',
  styleUrl: './review-card.component.css'
})
export class ReviewCardComponent{ 
  @Input() review!: Review;

  get itemType(): string {
    return this.review?.item?.getType() || '';
  }

  get itemAsAlbum(): Album | null {
    return this.itemType === 'ALBUM' ? this.review.item as Album : null;
  }
  
  get itemAsArtist(): Artist | null {
    return this.itemType === 'ARTIST' ? this.review.item as Artist : null;
  }
  
  get itemAsSong(): Song | null {
    return this.itemType === 'SONG' ? this.review.item as Song : null;
  }
}