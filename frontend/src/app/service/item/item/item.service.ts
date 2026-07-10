import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError, forkJoin } from 'rxjs'; // Import throwError, forkJoin
import { Item } from '../../../core/model/item/item.type';
import { Artist } from '../../../core/model/item/artist.type';
import { Album } from '../../../core/model/item/album.type';




type SpecificItemInstance = Artist | Album; //song;
type ItemTypeName = 'ARTIST' | 'SONG' | 'ALBUM'; 

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  protected apiUrl = 'http://localhost:8080/item';

  constructor(private http: HttpClient) {}

  // CREATE
  addItem(item: Item): Observable<Item> {
    return this.http.post<Item>(`${this.apiUrl}/add`, item);
  }

  // READ
  getItemById(id: number): Observable<Item> {
    return this.http.get<Item>(`${this.apiUrl}/find/${id}`);
  }

  getItemBySourceId(sourceId: string): Observable<Item> {
    return this.http.get<Item>(`${this.apiUrl}/findSource/${sourceId}`);
  }

  getAllItems(): Observable<Item[]> {
    return this.http.get<Item[]>(this.apiUrl);
  }

  // DELETE
  deleteItem(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }
}