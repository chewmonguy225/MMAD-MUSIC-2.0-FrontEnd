import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Review, ReviewPostRequestPayload } from '../../model/review.type';  
import { Artist } from '../../model/item/artist.type';
import { Item } from '../../model/item/item.type';
import { User } from '../../model/user.type';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private apiUrl = 'http://localhost:8080/reviews'; // replace with your real API endpoint

  constructor(private http: HttpClient) {}

  saveReview(reviewPayload: ReviewPostRequestPayload): Observable<any> {
    return this.http.post(`${this.apiUrl}/add`, reviewPayload);
  }

  

  
}
