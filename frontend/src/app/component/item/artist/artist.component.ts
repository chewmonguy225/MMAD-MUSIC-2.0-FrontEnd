import { Component } from '@angular/core';
import { ItemComponent } from '../item.component';
import { ArtistService } from '../../../service/item/artist/artist.service';
import { Artist } from '../../../core/model/item/artist.type';
import { Router } from '@angular/router';
import { ItemService } from '../../../service/item/item/item.service';

@Component({
  selector: 'app-artist',
  standalone: true,
  templateUrl: './artist.component.html',
  styleUrl: './artist.component.css'
})
export class ArtistComponent extends ItemComponent {

  constructor(
    itemService: ItemService,
    router: Router
  ) {
    super(itemService, router);
  }

  onSpotifyClick(): void {
    // optional
  }
}