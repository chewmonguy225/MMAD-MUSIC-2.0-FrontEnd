import { Injectable } from '@angular/core';
import { Song } from '../../../model/item/song.type';
import { Artist } from '../../../model/item/artist.type';
import { Album } from '../../../model/item/album.type';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { ItemService } from '../item.service';
@Injectable({
  providedIn: 'root'
})
export class SongService extends ItemService {
  protected override apiUrl = 'http://localhost:8080/song';
  protected searchUrl = 'http://localhost:8080/spotify/search/song';

  constructor(protected override http: HttpClient) {
    super(http);
  }

  public createSong(data: any): Song {
    const artist = new Artist(0, data.artist.id, data.artist.name, data.imageURL);
    const album = new Album(0, data.album.id, artist, data.album.name, data.album.imageURL);
    console.log (data.imageURL)
    return new Song(data.id, data.sourceId, artist, album, data.name, data.imageURL);
  }
  

  getSongWithId(id: number): Observable<Song> {
    return this.http.get<any>(`${this.apiUrl}/find/${id}`).pipe(
      map(data => this.createSong(data))
    );
  }

  getSongWithSourceID(sourceID: number): Observable<Song> {
    return this.http.get<any>(`${this.apiUrl}/findSource/${sourceID}`).pipe(
      map(data => this.createSong(data))
    );
  }

  searchSong(songName: string): Observable<Song[]> {
    return this.http.get<any[]>(`${this.searchUrl}/${songName}`).pipe(
      map(response =>
        response.map((data: any) => this.createSong(data))
      )
    );
  }

}

