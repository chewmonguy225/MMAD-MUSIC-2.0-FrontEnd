import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ItemComponent } from '../item.component';
import { ArtistService } from '../../../service/item/artist/artist.service';
import { Artist } from '../../../model/item/artist.type';

@Component({
  selector: 'app-artist',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './artist.component.html',
  styleUrls: ['../item.component.css', './artist.component.css']

})
export class ArtistComponent extends ItemComponent {
  @Input() override item: Artist | null = null;

  override onSpotifyClick(): void {
    const sourceId = this.item?.sourceId; // Access the sourceId property
    if (sourceId) {
      // CORRECTED SPOTIFY URL FOR ARTISTS
      window.open(`https://open.spotify.com/artist/${sourceId}`, '_blank');
    } else {
      console.error('Missing artist source ID for Spotify link.');
    }
  }
}
