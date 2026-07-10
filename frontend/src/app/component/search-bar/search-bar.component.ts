import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { Item } from '../../core/model/item/item.type';
import { UserDTO, UserService } from '../../service/user/user.service';
import { SearchService } from '../../service/search/search.service';
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

  results: Item[] = [];
  displayedItems: Item[] = [];

  currentPage = 1;
  itemsPerPage = 5;

  searchType: 'artist' | 'album' | 'song' | 'user' | 'all' = 'all';

  // ✅ cache users
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
    ).subscribe(query => {
      this.searchQuery = query;
      this.performSearch();
    });
  }

  // INPUT
  onSearchInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchSubject.next(input.value);
  }

  // SEARCH
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

    this.searchService.search(query, types).subscribe({
      next: (response) => {
        console.log(response)
        const items = response.items ?? [];

        this.results = items;


        this.currentPage = 1;

        // ✅ PRELOAD USERS HERE (correct place)
        items.forEach(item => {
          if (item.type === 'user' && !this.userCache.has(item.name)) {
            this.userService.getUserByUsername(item.name).subscribe(user => {
              this.userCache.set(item.name, user);
            });
          }
        });

        this.updateDisplayedItems();
      },
      error: (err) => console.error(err)
    });
  }

  // PAGINATION
  updateDisplayedItems(): void {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.displayedItems = this.results.slice(start, end);
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
    return Math.ceil(this.results.length / this.itemsPerPage);
  }

  // ITEM CLICK
  selectItem(item: Item): void {

    console.log(item);
    if (item.type === 'artist' || item.type === 'album' || item.type === 'song') {
      this.itemService.addItem(item).subscribe({
        next: (savedItem) => this.itemSelected.emit(savedItem),
        error: (err) => console.error(err)
      });
      return;
    }

    this.itemSelected.emit(item);
  }

  // USER NAVIGATION
  goToUserProfile(username: string): void {
    this.router.navigate(['/profile', username]);
  }
}