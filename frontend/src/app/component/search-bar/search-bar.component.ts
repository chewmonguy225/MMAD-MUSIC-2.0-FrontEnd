import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { Item } from '../../core/model/item/item.type';
import { SearchResult } from '../../core/dto/search/search-result.model';

import { SearchService } from '../../service/search/search.service';
import { UserDTO, UserService } from '../../service/user/user.service';
import { ItemService } from '../../service/item/item/item.service';

import { AlbumComponent } from '../item/album/album.component';
import { ArtistComponent } from '../item/artist/artist.component';
import { SongComponent } from '../item/song/song.component';
import { UserCardComponent } from '../user-card/user-card.component';

import { Router } from '@angular/router';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [
    CommonModule,
    ArtistComponent,
    AlbumComponent,
    SongComponent,
    UserCardComponent
  ],
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {

  @Output() itemSelected = new EventEmitter<Item>();

  private searchSubject = new Subject<string>();

  searchQuery = '';

  results: SearchResult[] = [];
  displayedItems: SearchResult[] = [];

  currentPage = 1;
  itemsPerPage = 5;

  searchType: 'artist' | 'album' | 'song' | 'user' | 'all' = 'all';

  userCache = new Map<string, UserDTO>();

  constructor(
    private searchService: SearchService,
    private userService: UserService,
    private itemService: ItemService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged()
    )
      .subscribe((query: string) => {
        this.searchQuery = query;
        this.performSearch();
      });
  }

  onSearchInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchSubject.next(input.value);
  }

  performSearch(): void {

    const query = this.searchQuery.trim();

    if (!query) {
      this.results = [];
      this.displayedItems = [];
      this.currentPage = 1;
      return;
    }

    let types: string[] | undefined;

    if (this.searchType !== 'all') {
      types = [this.searchType];
    }

    this.searchService.search(query, types)
      .subscribe({
        next: (response) => {

          const items: SearchResult[] = response.items ?? [];

          this.results = items;
          console.log(items);
          this.currentPage = 1;

          items.forEach((item: SearchResult) => {

            if (
              item.type === 'user' &&
              !this.userCache.has(item.name)
            ) {
              this.userService
                .getUserByUsername(item.name)
                .subscribe((user: UserDTO) => {
                  this.userCache.set(item.name, user);
                });
            }

          });

          this.updateDisplayedItems();
        },

        error: (err: any) => {
          console.error(err);
        }
      });
  }

  updateDisplayedItems(): void {

    const start = (this.currentPage - 1) * this.itemsPerPage;

    this.displayedItems = this.results.slice(
      start,
      start + this.itemsPerPage
    );
  }

  nextPage(): void {

    if (this.currentPage * this.itemsPerPage < this.results.length) {
      this.currentPage++;
      this.updateDisplayedItems();
    }

  }

  prevPage(): void {

    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateDisplayedItems();
    }

  }

  getTotalPages(): number {
    return Math.ceil(
      this.results.length / this.itemsPerPage
    );
  }

  selectItem(item: SearchResult): void {

    if (item.type === 'user') {
      this.goToUserProfile(item.name);
      return;
    }


    const request: Item = {
      id: null,
      sourceId: item.sourceId,
      name: item.name,
      imageURL: item.imageURL,
      type: item.type,
      provider: item.provider
    };


    this.itemService.addItem(request)
      .subscribe({
        next: (saved: Item) => {
          this.itemSelected.emit(saved);
          console.log(saved);
        },
        error: (err) => {
          console.error(err);
        }
      });
  }
  
  goToUserProfile(username: string): void {
    this.router.navigate([
      '/profile',
      username
    ]);
  }
}