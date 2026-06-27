import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Review } from '../../model/review.type';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  private apiUrl = 'http://localhost:8080/reviews';

  constructor(private http: HttpClient) {}


  getReviewById(id: number): Observable<Review> {
    if (id <= 0) {
      throw new Error("Review ID must be positive.");
    }
    return this.http.get<Review>(`${this.apiUrl}/find/${id}`);
  }

  getAllReviews(): Observable<Review[]> {
    return this.http.get<Review[]>(`${this.apiUrl}/all`);
  }

  getUserReviews(username: string): Observable<Review[]> {
    return this.http.get<Review[]>(`${this.apiUrl}/user/${username}`);
  }
}