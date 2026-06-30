import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { Artist } from '../../core/model/item/artist.type';
import { Item } from '../../core/model/item/item.type';

import { SearchService } from '../../core/service/search/search.service';
import { UserService } from '../../core/service/user/user.service';
import { ArtistService } from '../../core/service/item/artist/artist.service';

import { AlbumComponent } from '../item/album/album.component';
import { ArtistComponent } from '../item/artist/artist.component';
import { ItemService } from '../../core/service/item/item/item.service';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [
    ArtistComponent,
    AlbumComponent,
    CommonModule
  ],
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {

  @Output() itemSelected = new EventEmitter<Item>();

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
    private userService: UserService,
    private itemService: ItemService
  ) {}

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
      next: (response) => {
    
        const items = response.items ?? [];
    
        this.results = items;
        this.currentPage = 1;
    
        this.updateDisplayedItems();
      },
    
      error: (err) => {
        console.error(err);
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


  selectItem(item: Item): void {

    if (item.type === 'artist' || item.type === 'album') {
  
      this.itemService.addItem(item).subscribe({
        next: (savedItem) => {
          console.log('Saved:', savedItem);
          this.itemSelected.emit(savedItem);
        },
        error: (err) => {
          console.error('Failed to save item:', err);
        }
      });
  
      return;
    }
  
    this.itemSelected.emit(item);
  }
}