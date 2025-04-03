import { Injectable } from '@angular/core';
import { Album } from '../../../model/item/album.type';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { ItemService } from '../item.service';
@Injectable({
  providedIn: 'root'
})
export class AlbumService extends ItemService {
  protected override apiUrl = 'http://localhost:8080/album';
  protected searchUrl = 'http://localhost:8080/spotify/search/album';

  constructor(protected override http: HttpClient) {
    super(http);
  }

  public createAlbum(data: any): Album {
    return new Album(data.id, data.sourceId, data.artistID, data.name, data.imageURL);
  }

  getArtistWithId(id: number): Observable<Album> {
    return this.http.get<any>(`${this.apiUrl}/find/${id}`).pipe(
      map(data => this.createAlbum(data))
    );
  }

  getArtistWithSourceID(sourceID: number): Observable<Album> {
    return this.http.get<any>(`${this.apiUrl}/findSource/${sourceID}`).pipe(
      map(data => this.createAlbum(data))
    );
  }

  searchArtist(albumName: string): Observable<Album[]> {
    return this.http.get<any[]>(`${this.searchUrl}/${albumName}`).pipe(
      map(response =>
        response.map((data: any) => this.createAlbum(data))
      )
    );
  }

}
