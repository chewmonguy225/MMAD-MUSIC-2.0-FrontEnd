import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Artist } from '../../../model/item/artist.type';
import { Item } from '../../../model/item/item.type';
import { Album } from '../../../model/item/album.type';
import { SpotifyService } from '../../../service/externalAPI/spotify/spotify.service';
import { ItemComponent } from '../../item/item.component';
import { ArtistComponent } from '../../item/artist/artist.component';
import { ArtistService } from '../../../service/item/artist/artist.service';
import { AlbumService } from '../../../service/item/album/album.service';



@Component({
  selector: 'app-search-bar',
  standalone: true,
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

  constructor(private externalAPIservice: SpotifyService, private artistService: ArtistService, private albumService: AlbumService) {
  }

  onSearchInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchQuery = input.value;  // Store the value of the input
  }

  searchArtist(): void {
    if (this.searchQuery.trim() !== '') {
      // Assuming 'this.artistService' is your injected ArtistService instance
      // The method is named 'searchArtists' in the service
      this.artistService.searchArtists(this.searchQuery).subscribe({ // <-- Changed to searchArtists if that's the service method name
        next: (artists: Artist[]) => { // 'artists' is ALREADY an array of Artist objects
          console.log('Artists found:', artists);  // <-- Added console log here
          if (artists.length > 0) {
            // FIX IS HERE: Directly assign the received 'artists' array
            this.results = artists; // <-- Removed the .map() and createArtist call
            this.currentPage = 1; // Reset to the first page
            this.updateDisplayedItems();
          } else {
            this.results = []; // No results found
          }
        },
        error: (err) => {
          this.results = []; // Clear results on error
          // If 'this.item' refers to a single selected item, its handling depends on context.
          // this.item = null; // This line might or might not be necessary depending on what 'this.item' is
        }
      });
    } else {
      this.results = []; // Clear results if search query is empty
      this.currentPage = 1; // Reset pagination
    }
  }

  searchAlbum(): void {
    if (this.searchQuery.trim() !== '') {
      this.albumService.searchAlbums(this.searchQuery).subscribe({
        next: (albums: Album[]) => {
          console.log('Albums found:', albums);  // <-- Added console log here
          if (albums.length > 0) {
            this.results = albums; // Direct assignment
            this.currentPage = 1;  // Reset pagination
            this.updateDisplayedItems();
          } else {
            this.results = []; // No results found
          }
        },
        error: (err) => {
          this.results = []; // Clear on error
          // Optional: handle error logging or notifications here
        }
      });
    } else {
      this.results = []; // Clear if input is empty
      this.currentPage = 1;
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
