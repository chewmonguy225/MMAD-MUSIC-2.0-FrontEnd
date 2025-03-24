import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Artist } from '../../model/item/artist.type';
import { Item } from '../../model/item/item.type';
import { SpotifyService } from '../../service/externalAPI/spotify/spotify.service';
import { ItemComponent } from '../item/item.component';
import { ArtistComponent } from '../item/artist/artist.component';
import { ArtistService } from '../../service/item/artist/artist.service';


@Component({
  selector: 'app-search-bar',
  imports: [ArtistComponent, CommonModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})

export class SearchBarComponent {
  searchQuery: string = '';  // Variable to hold the search query
  results: Item[] = [];  // Variable to store the result
  displayedItems: Item[] = [];  //items being shown
  item: Item | null = null;
  currentPage: number = 1;
  itemsPerPage: number = 5;
  
  constructor(private externalAPIservice: SpotifyService, private artistService: ArtistService) {
  }

  onSearchInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchQuery = input.value;  // Store the value of the input
  }

  searchArtist(): void {
    console.log("here");
    if (this.searchQuery.trim() !== '') {
      this.externalAPIservice.searchArtist(this.searchQuery).subscribe({
        next: (artists: Artist[]) => {
          if (artists.length > 0) {
            this.results = artists.map(artist => this.artistService.createArtist(artist))
            this.currentPage = 1; // Reset to the first page
            this.updateDisplayedItems();
            console.log(this.results);
          } else {
            this.results = []; // No results found
          }
        },
        error: (err) => {
          console.error('Error fetching artists:', err);
          this.item = null;
        }
      });
    }
  }


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
  
}
