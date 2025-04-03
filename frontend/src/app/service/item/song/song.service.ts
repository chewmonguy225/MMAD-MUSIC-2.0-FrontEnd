import { Injectable } from '@angular/core';
import { Song } from '../../../model/item/song.type';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { ItemService } from '../item.service';
@Injectable({
  providedIn: 'root'
})
export class SongService extends ItemService {
  protected override apiUrl = 'http://localhost:8080/artist';
  protected searchUrl = 'http://localhost:8080/spotify/search/artist';

  constructor(protected override http: HttpClient) {
    super(http);
  }

  public createSong(data: any): Song {
    return new Song(data.id, data.sourceId, data.artistID, data.albumID, data.name, data.imageURL);
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

