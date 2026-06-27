import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Artist } from '../../../model/item/artist.type';
import { ItemService } from '../item/item.service';

@Injectable({
  providedIn: 'root'
})
export class ArtistService extends ItemService {

  protected override apiUrl = 'http://localhost:8080/item/artists';
  protected searchUrl = 'http://localhost:8080/spotify/search/artist';

  constructor(protected override http: HttpClient) {
    super(http);
  }

  // CREATE
  public addArtist(artist: Artist): Observable<Artist> {
    return this.http.post<Artist>(
      `${this.apiUrl}/add`,
      artist
    );
  }

  // READ ALL
  public getAllArtists(): Observable<Artist[]> {
    return this.http.get<Artist[]>(
      `${this.apiUrl}/all`
    );
  }

  // READ BY ID
  public getArtistById(id: number): Observable<Artist> {
    return this.http.get<Artist>(
      `${this.apiUrl}/find/${id}`
    );
  }

  // READ BY SOURCE ID
  public getArtistBySourceId(sourceId: string): Observable<Artist> {
    return this.http.get<Artist>(
      `${this.apiUrl}/findSource/${sourceId}`
    );
  }

  // UPDATE
  public updateArtist(artist: Artist): Observable<Artist> {
    if (!artist.id) {
      throw new Error('Artist ID is required for update operation.');
    }

    return this.http.put<Artist>(
      `${this.apiUrl}/update`,
      artist
    );
  }

  // DELETE
  public deleteArtist(id: number): Observable<void> {
    return this.http.delete<void>(
      `${this.apiUrl}/delete/${id}`
    );
  }
}