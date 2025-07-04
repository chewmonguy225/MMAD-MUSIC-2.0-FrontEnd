// src/app/auth/auth.service.ts
import { Injectable } from '@angular/core';
import { UserDTO } from '../user/user.service';

export interface User {
  id: number;
  username: string;
  // add other user fields as needed
}

export interface LoginResponse {
  token: string;
  user: User;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  setSession(token: string, user: UserDTO): void {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getCurrentUser(): UserDTO | null {
    const userJson = localStorage.getItem('user');
    return userJson ? JSON.parse(userJson) : null;
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}

