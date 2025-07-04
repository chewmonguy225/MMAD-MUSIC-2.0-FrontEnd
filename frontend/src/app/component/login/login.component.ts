import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../service/user/user.service';
import { AuthService } from '../../service/auth/auth.service';
import { NgIf } from '@angular/common';

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
  authService = inject(AuthService); // inject AuthService

  isLoginView: boolean = false;
  errorMessage: string = '';

  registerObj: any = {
    username: '',
    password: ''
  }

  loginObj: any = {
    username: '',
    password: ''
  }


  onRegister() {
    this.errorMessage = '';

    if(!this.registerObj.username || !this.registerObj.password) {
      this.errorMessage = 'Please fill out all required fields.';
      return;
    }
   
    this.userService.register(this.registerObj).subscribe({
      next: (res:any) => {
          alert("Registration success");
          this.isLoginView = true;
      },
      error: (err) => {
        console.error("Registration error:", err.message);
        this.errorMessage = 'Username already taken. Please choose a different one.';
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
      next: (res: any) => {
        // Here you expect res to have: { token, user }
        this.authService.setSession(res.token, res.user);
        alert("Login success");
        // Remove isLoggedIn from localStorage, authService manages that now
        this.router.navigateByUrl('dashboard');
      },
      error: (err) => {
        console.error("Login error:", err.message);
        this.errorMessage = 'Login failed. Please check your credentials and try again.';
      }
    });

  }


  switchView(isLogin: boolean) {
    this.isLoginView = isLogin;
    this.errorMessage = '';
  }


  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();  // Use AuthService method
  }
  
}
