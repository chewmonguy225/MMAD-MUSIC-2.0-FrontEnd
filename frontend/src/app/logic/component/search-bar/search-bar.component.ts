import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { Artist } from '../../model/item/artist.type';
import { Item } from '../../model/item/item.type';
import { UserDTO } from '../../service/user/user.service';

import { SearchService } from '../../service/search/search.service';
import { UserService } from '../../service/user/user.service';

import { ArtistComponent } from '../item/artist/artist.component';
import { UserCardComponent } from '../user-card/user-card.component';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [
    ArtistComponent,
    CommonModule
  ],
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {

  private searchSubject = new Subject<string>();
  searchQuery: string = '';

  // results
  results: Item[] = [];
  displayedItems: Item[] = [];

  // pagination
  currentPage: number = 1;
  itemsPerPage: number = 5;

  // filter
  searchType: 'artist' | 'album' | 'song' | 'user' | 'all' = 'all';

  constructor(
    private searchService: SearchService,
    private userService: UserService
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

  // INPUT HANDLER
  onSearchInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchSubject.next(input.value);
  }

  // MAIN SEARCH
  performSearch(): void {

    const query = this.searchQuery.trim();

    if (!query) {
      this.results = [];
      this.displayedItems = [];
      this.currentPage = 1;
      return;
    }

    let types: string[] | undefined = undefined;

    if (this.searchType !== 'all') {
      types = [this.searchType];
    }

    this.searchService.search(query, types).subscribe({
      next: (response: any) => {

        const artists = response?.artists ?? [];

        this.results = artists;

        this.currentPage = 1;
        this.updateDisplayedItems();
      },

      error: (err) => {
        console.error('❌ SEARCH ERROR:', err);
      }
    });
  }

  // PAGINATION
  updateDisplayedItems(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;

    this.displayedItems = this.results.slice(startIndex, endIndex);
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

  // TYPE GUARDS
  isArtist(item: Item): item is Artist {
    return this.searchType === 'artist';
  }
}