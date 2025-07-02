import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';


export interface UserRequest {
  username: string;
  password: string;
}

export interface UserDTO {
  username: string;
  friendList?: string[];
  playlists?: number[];
}


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:8080/user';

  constructor(private http: HttpClient) {}

  register(credentials: UserRequest): Observable<UserDTO> {
    return this.http.post<UserDTO>(`${this.apiUrl}/create`, credentials).pipe(
      catchError(this.handleError)
    );
  }

  login(credentials: UserRequest): Observable<UserDTO> {
    return this.http.post<UserDTO>(`${this.apiUrl}/login`, credentials).pipe(
      catchError(this.handleError)
    );
  }


  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred.';
    
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      switch (error.status) {
        case 400:
          errorMessage = 'Bad Request: Please check your input.';
          break;
        case 401:
          errorMessage = 'Unauthorized: Invalid username or password.';
          break;
        case 403:
          errorMessage = 'Forbidden: You don’t have permission to do this.';
          break;
        case 404:
          errorMessage = 'Not Found: The requested resource was not found.';
          break;
        case 500:
          errorMessage = 'Server Error: Please try again later.';
          break;
        default:
          errorMessage = `Error ${error.status}: ${error.message}`;
      }
    }

    console.error(`HTTP Error: ${errorMessage}`);
    return throwError(() => new Error(errorMessage));
  }

}
