import { Component } from '@angular/core';
import { ItemComponent } from '../item.component';
import { Router } from '@angular/router';
import { ItemService } from '../../../core/service/item/item/item.service';

@Component({
  selector: 'app-album',
  standalone: true,
  templateUrl: './album.component.html',
  styleUrl: './album.component.css'
})
export class AlbumComponent extends ItemComponent {

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