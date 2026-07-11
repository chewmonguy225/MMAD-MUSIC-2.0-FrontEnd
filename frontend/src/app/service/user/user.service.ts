import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { LoginResponse } from '../../core/dto/login-response.model';

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface VerifyRequest {
  email: string;
  code: string;
}

export interface MessageResponse {
  success: boolean;
  message: string;
}

export interface UserDTO {
  username: string;
  followers?: string[];
  following?: string[];
}

export interface UserProfileDTO {
  username: string;
  followers?: string[];
  following?: string[];
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:8080/user';

  constructor(private http: HttpClient) {}

  register(credentials: RegisterRequest): Observable<UserDTO> {

    return this.http.post<UserDTO>(
      `${this.apiUrl}/create`,
      credentials
    ).pipe(
      catchError(this.handleError)
    );

  }


  login(credentials: LoginRequest): Observable<LoginResponse> {

    return this.http.post<LoginResponse>(
      `${this.apiUrl}/login`,
      credentials
    ).pipe(
      catchError(this.handleError)
    );

  }


  verifyUser(credentials: VerifyRequest): Observable<MessageResponse> {

    return this.http.post<MessageResponse>(
      `${this.apiUrl}/verify`,
      credentials
    ).pipe(
      catchError(this.handleError)
    );

  }


  getMyProfile(): Observable<UserDTO> {

    return this.http.get<UserDTO>(
      `${this.apiUrl}/me`
    ).pipe(
      catchError(this.handleError)
    );

  }


  getUserByUsername(username: string): Observable<UserDTO> {

    return this.http.get<UserDTO>(
      `${this.apiUrl}/username/${username}`
    ).pipe(
      catchError(this.handleError)
    );

  }


  searchUsers(query: string): Observable<UserDTO[]> {

    const params = new HttpParams()
      .set('query', query);

    return this.http.get<UserDTO[]>(
      `${this.apiUrl}/search`,
      { params }
    ).pipe(
      catchError(this.handleError)
    );

  }


  followUser(
    username: string,
    followUsername: string
  ): Observable<string> {

    const params = new HttpParams()
      .set('username', username)
      .set('followUsername', followUsername);


    return this.http.post(
      `${this.apiUrl}/follow`,
      null,
      {
        params,
        responseType: 'text' as const
      }
    ).pipe(
      catchError(this.handleError)
    );

  }


  unfollowUser(
    username: string,
    unfollowUsername: string
  ): Observable<string> {

    const params = new HttpParams()
      .set('username', username)
      .set('unfollowUsername', unfollowUsername);


    return this.http.post(
      `${this.apiUrl}/unfollow`,
      null,
      {
        params,
        responseType: 'text' as const
      }
    ).pipe(
      catchError(this.handleError)
    );

  }


  getFollowersList(userId: number): Observable<UserDTO[]> {

    return this.http.get<UserDTO[]>(
      `${this.apiUrl}/followers/${userId}`
    ).pipe(
      catchError(this.handleError)
    );

  }


  getFollowingList(userId: number): Observable<UserDTO[]> {

    return this.http.get<UserDTO[]>(
      `${this.apiUrl}/following/${userId}`
    ).pipe(
      catchError(this.handleError)
    );

  }


  private handleError(error: HttpErrorResponse) {

    let errorMessage = 'An unknown error occurred.';


    if (error.error instanceof ErrorEvent) {

      errorMessage = `Error: ${error.error.message}`;

    } else {

      if (error.error?.message) {

        errorMessage = error.error.message;

      } else {

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

    }


    console.error(`HTTP Error: ${errorMessage}`);

    return throwError(() => new Error(errorMessage));

  }

}