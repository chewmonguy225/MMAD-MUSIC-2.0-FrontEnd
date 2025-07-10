import { Injectable } from '@angular/core';
import { Observable, throwError, forkJoin, map } from 'rxjs'; // Import throwError, forkJoin
import { Item } from '../../model/item/item.type';
import { Artist } from '../../model/item/artist.type';

import { ArtistService } from './artist/artist.service';
import { ItemService } from './item/item.service';


type SpecificItemInstance = Artist //| Song | Album;
type ItemTypeName = 'ARTIST' | 'SONG' | 'ALBUM'; // Still use string literals for retrieval/deletion by type

@Injectable({
  providedIn: 'root'
})
export class RootItemService {

  constructor(
    private itemService: ItemService,
    private artistService: ArtistService,
    //private songService: SongService,
    //private albumService: AlbumService
  ) { }

  //CREATE
  addItem(item: SpecificItemInstance): Observable<SpecificItemInstance> {
    // This console.log is fine, as 'item' still has its original type here
    console.log('ItemService (Create): Dispatching item for instance:', item.constructor.name);

    if (item instanceof Artist) {
      return this.artistService.addArtist(item);
      // } else if (item instanceof Song) {
      //   return this.songService.addSong(item);
      // } else if (item instanceof Album) {
      //   return this.albumService.addAlbum(item);
    } else {
      // ERROR FIX: Cast 'item' to 'any' or 'object' here to access 'constructor.name'
      // TypeScript correctly deduced 'item' is 'never' here, but we want to log
      // what was *actually* passed at runtime in case of an unexpected input.
      const unknownItem = item as any; // Or item as object;
      return throwError(() => new Error(`Unsupported item instance type for addition: ${unknownItem.constructor.name}`));
    }
  }

  //READ
  getItemById(id: number, type?: ItemTypeName): Observable<SpecificItemInstance | Item> {
    console.log(`ItemService (Read): Getting item with ID ${id} of type: ${type || 'GENERIC'}`);

    if (type) {
      switch (type) {
        case 'ARTIST':
          return this.artistService.getArtistById(id);
        // case 'SONG': // Uncomment when Song is ready
        //   return this.songService.getSongById(id);
        // case 'ALBUM': // Uncomment when Album is ready
        //   return this.albumService.getAlbumById(id);
        default:
          return throwError(() => new Error(`Unsupported specific item type for retrieval: ${type}`));
      }
    } else {
      // If no specific type is provided, fetch a generic Item using GenericItemService
      return this.itemService.getItemById(id);
    }
  }


  getItemBySourceId(sourceId: string, type?: ItemTypeName): Observable<SpecificItemInstance | Item> {
    console.log(`ItemService (Read): Getting item with Source ID ${sourceId} of type: ${type || 'GENERIC'}`);

    if (type) {
      switch (type) {
        case 'ARTIST':
          return this.artistService.getArtistBySourceId(sourceId);
        // Add cases for SONG and ALBUM if they have source IDs
        default:
          return throwError(() => new Error(`Unsupported specific item type for retrieval by source ID: ${type}`));
      }
    } else {
      // If no specific type, fetch generic Item by Source ID
      return this.itemService.getItemBySourceId(Number(sourceId)); // Ensure type matches GenericItemService
    }
  }


  // READ: Get all items (can be generic or combined specific)

  //JUST BASIC
  getAllItemsSimplified(): Observable<Item[]> {
    return this.itemService.getAllItems();
  }

  getAllItems(): Observable<SpecificItemInstance[]> {
    console.log('ItemService (Read): Getting ALL items (Artists, Songs, Albums) combined.');
    return forkJoin([
      this.artistService.getAllArtists(),
      // this.songService.getAllSongs(), // Uncomment when ready
      // this.albumService.getAllAlbums() // Uncomment when ready
    ]).pipe(
      map(([artists]) => [...artists])
      // map(([artists, songs, albums]) => [...artists, ...songs, ...albums])
    );
  }

  getAllItemsByType(type: ItemTypeName): Observable<SpecificItemInstance[]> {
    console.log(`ItemService (Read): Getting all items of type: ${type}`);
    switch (type) {
      case 'ARTIST':
        return this.artistService.getAllArtists() as Observable<Artist[]>;
      // case 'SONG':
      //   return this.songService.getAllSongs() as Observable<Song[]>;
      // case 'ALBUM':
      //   return this.albumService.getAllAlbums() as Observable<Album[]>;
      default:
        return throwError(() => new Error(`Unsupported item type for all retrieval: ${type}`));
    }
  }

  //UPDATE

  updateItem(item: SpecificItemInstance): Observable<SpecificItemInstance> {
    console.log('ItemService (Update): Dispatching item update for instance:', item.constructor.name);
    if (item instanceof Artist) {
      return this.artistService.updateArtist(item);
      // } else if (item instanceof Song) {
      //   return this.songService.updateSong(item);
      // } else if (item instanceof Album) {
      //   return this.albumService.updateAlbum(item);
    } else {
      const unknownItem = item as any; // Or item as object;
      return throwError(() => new Error(`Unsupported item instance type for update: ${unknownItem.constructor.name}`));
    }
  }



  deleteItem(id: number, type?: ItemTypeName): Observable<void> {
    console.log(`ItemService (Delete): Dispatching item deletion for ID ${id} of type: ${type || 'GENERIC'}`);

    if (type) {
      switch (type) {
        case 'ARTIST':
          return this.artistService.deleteArtist(id);
        // case 'SONG': // Uncomment when Song is ready
        //   return this.songService.deleteSong(id);
        // case 'ALBUM': // Uncomment when Album is ready
        //   return this.albumService.deleteAlbum(id);
        default:
          return throwError(() => new Error(`Unsupported specific item type for deletion: ${type}`));
      }
    } else {
      // If no specific type, delete via GenericItemService
      return this.itemService.deleteItem(id);
    }
  }

  searchItems(query: string, type?: ItemTypeName): Observable<SpecificItemInstance[]> {
    console.log(`ItemService (Search): Searching for "${query}" of type: ${type || 'ALL'}`);

    if (type) {
      // Search for a specific type
      switch (type) {
        case 'ARTIST':
          return this.artistService.searchArtists(query);
        // case 'SONG':
        //   return this.songService.searchSongs(query);
        // case 'ALBUM':
        //   return this.albumService.searchAlbums(query);
        default:
          return throwError(() => new Error(`Unsupported item type for search: ${type}`));
      }
    } else {
      // Search across all types and combine results
      return forkJoin([
        this.artistService.searchArtists(query),
        // this.songService.searchSongs(query),
        // this.albumService.searchAlbums(query)
      ]).pipe(
        map(([artists]: [Artist[]]) => {
          return [...artists];
          // map(([artists, songs, albums]: [Artist[], Song[], Album[]]) => {
          //   // Combine all results into a single array
          //   return [...artists, ...songs, ...albums];
        })
      );
    }
  }

  
}