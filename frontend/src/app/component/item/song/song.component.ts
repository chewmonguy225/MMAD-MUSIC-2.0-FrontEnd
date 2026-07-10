import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { ItemComponent } from '../item.component';
import { ItemService } from '../../../service/item/item/item.service';
import { Song } from '../../../core/model/item/song.type';

@Component({
  selector: 'app-song',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './song.component.html',
  styleUrl: './song.component.css'
})
export class SongComponent extends ItemComponent {

  get song(): Song {
    return this.item as Song;
  }

  constructor(
    itemService: ItemService,
    router: Router
  ) {
    super(itemService, router);
  }

  override onSpotifyClick(): void {
    // optional
  }

  getArtistNames(song: Song): string {
    return song.artists
      ?.map(artist => artist.name)
      .join(', ') ?? '';
  }

}