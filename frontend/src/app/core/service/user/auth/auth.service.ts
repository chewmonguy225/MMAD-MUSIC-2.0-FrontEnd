import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private tokenKey = 'token';
  private usernameKey = 'username';

  // -------------------------
  // SESSION
  // -------------------------
  setSession(token: string, username: string): void {
    localStorage.setItem(this.tokenKey, token);
    localStorage.setItem(this.usernameKey, username);
  }

  // -------------------------
  // GETTERS
  // -------------------------
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  getUsername(): string | null {
    return localStorage.getItem(this.usernameKey);
  }

  // -------------------------
  // AUTH STATE
  // -------------------------
  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  // -------------------------
  // LOGOUT
  // -------------------------
  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.usernameKey);
  }
}