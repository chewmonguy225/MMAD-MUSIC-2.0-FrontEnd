import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { ReviewViewerComponent } from '../../review/review-viewer/review-viewer.component';

import { ItemReviewViewModel } from '../../../core/model/review/ItemReviewsResponse';
import { PageService } from '../../../service/page/page.service';
import { UiService } from '../../../service/ui/ui.service';

import { Item } from '../../../core/model/item/item.type';
import { Album } from '../../../core/model/item/album.type';
import { Artist } from '../../../core/model/item/artist.type';
import { Song } from '../../../core/model/item/song.type';

import { AlbumComponent } from '../../item/album/album.component';
import { AlbumSongsComponent } from '../../item/album/album-songs/album-songs/album-songs.component';
import { SimplifiedSong } from '../../../core/model/page/item-page.type';

@Component({
  selector: 'app-item-page',
  standalone: true,
  imports: [
    CommonModule,
    ReviewViewerComponent,
    AlbumComponent,
    AlbumSongsComponent
  ],
  templateUrl: './item-page.component.html',
  styleUrls: ['./item-page.component.css']
})
export class ItemPageComponent implements OnInit {

  item: Item | null = null;

  reviews: ItemReviewViewModel[] = [];

  // Related content
  songs: SimplifiedSong[] = [];
  albums: Album[] = [];

  itemId: number | null = null;

  cardComponent = 'ItemReviewCardComponent';

  isLoading = false;
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private pageService: PageService,
    private ui: UiService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {

      const id = Number(params['id']);

      if (!id) {
        return;
      }

      this.itemId = id;
      this.loadPage(id);
    });
  }

  loadPage(id: number): void {

    this.isLoading = true;

    this.pageService.getItemPage(id).subscribe({

      next: (res) => {
        console.log(res);
        this.item = res.item;
        this.reviews = res.reviews;

        this.songs = res.songs ?? [];
        this.albums = res.albums ?? [];

        this.isLoading = false;
      },

      error: (err) => {

        console.error(err);

        this.errorMessage = 'Failed to load page';

        this.item = null;
        this.reviews = [];
        this.songs = [];
        this.albums = [];

        this.isLoading = false;
      }
    });
  }

  openReviewModal(): void {

    if (!this.item) {
      return;
    }

    this.ui.openReviewBuilder(this.item);
  }

  // ----------------------------
  // Type helpers
  // ----------------------------

  get album(): Album | null {
    return this.item?.type === 'album'
      ? this.item as Album
      : null;
  }

  get artist(): Artist | null {
    return this.item?.type === 'artist'
      ? this.item as Artist
      : null;
  }

  get song(): Song | null {
    return this.item?.type === 'song'
      ? this.item as Song
      : null;
  }

  get isAlbum(): boolean {
    return this.item?.type === 'album';
  }

  get isArtist(): boolean {
    return this.item?.type === 'artist';
  }

  get isSong(): boolean {
    return this.item?.type === 'song';
  }

  get relatedTitle(): string {

    if (this.isArtist) {
      return 'Albums';
    }

    if (this.isAlbum) {
      return 'Tracks';
    }

    if (this.isSong) {
      return 'More Like This';
    }

    return 'Related';
  }
}