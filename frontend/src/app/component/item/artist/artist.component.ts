import { Component } from '@angular/core';
import { ItemComponent } from '../item.component';
import { ItemService } from '../../../core/service/item/item/item.service';
import { Router } from '@angular/router';

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