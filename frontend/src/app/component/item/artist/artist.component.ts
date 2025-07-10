import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ItemComponent } from '../item.component';
import { ArtistService } from '../../../service/item/artist/artist.service';
import { ReviewBuilderComponent } from '../../review/review-builder/review-builder.component';

@Component({
  selector: 'app-artist',
  standalone: true,
  imports: [CommonModule, FormsModule, ReviewBuilderComponent],
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.css']
})
export class ArtistComponent extends ItemComponent {

  override onSpotifyClick(): void {
    const id = this.item?.getSourceId();
    if (id) window.open(`https://open.spotify.com/artist/${id}`, '_blank');
    else console.error('Missing artist ID');
  }
}
