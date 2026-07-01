import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService, UserDTO } from '../../core/service/user/user.service';
import { NgIf } from '@angular/common';
import { AuthService } from '../../core/service/user/auth/auth.service';
import { LoginResponse } from '../../core/dto/login-response.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    NgIf
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  router = inject(Router);
  userService = inject(UserService);
  authService = inject(AuthService);

  isLoginView: boolean = false;
  errorMessage: string = '';

  // ✅ properly typed now
  registerObj: { username: string; password: string } = {
    username: '',
    password: ''
  };

  loginObj: { username: string; password: string } = {
    username: '',
    password: ''
  };

  onRegister() {
    this.errorMessage = '';

    if (!this.registerObj.username || !this.registerObj.password) {
      this.errorMessage = 'Please fill out all required fields.';
      return;
    }

    this.userService.register(this.registerObj).subscribe({
      next: () => {
        alert("Registration success");
        this.isLoginView = true;
        this.loginObj.username = this.registerObj.username;
        this.loginObj.password = '';
      },
      error: (err) => {
        console.error("Registration error:", err);
        this.errorMessage =
          err.error?.message ||
          'Username already taken. Please choose a different one.';
      }
    });
  }

  onLogin() {
    this.errorMessage = '';

    if (!this.loginObj.username || !this.loginObj.password) {
      this.errorMessage = 'Please fill out all required fields.';
      return;
    }

    this.userService.login(this.loginObj).subscribe({
      next: (res: LoginResponse) => {

        console.log('Login success response:', res);

        this.authService.setSession(res.token, res.username);

        console.log('Logged in user:', res.username);

        alert("Login success");

        this.router.navigateByUrl('home');
      },

      error: (err) => {
        console.error("Login error:", err);

        this.errorMessage =
          err.error?.message ||
          'Login failed. Please check your credentials and try again.';
      }
    });
  }

  switchView(isLogin: boolean) {
    this.isLoginView = isLogin;
    this.errorMessage = '';
  }
}