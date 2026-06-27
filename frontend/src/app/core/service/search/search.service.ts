import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private baseUrl = 'http://localhost:8080/search';

  constructor(private http: HttpClient) {}

  search(query: string, types?: string[]): Observable<any> {
    const typeParam = types?.length ? `?type=${types.join(',')}` : '';
    return this.http.get(`${this.baseUrl}/${query}${typeParam}`);
  }
}