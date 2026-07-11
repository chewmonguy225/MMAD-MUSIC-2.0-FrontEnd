import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';

import {
  UserService,
  RegisterRequest,
  LoginRequest
} from '../../../../service/user/user.service';

import { AuthService } from '../../../../service/user/auth/auth.service';
import { LoginResponse } from '../../../../core/dto/login-response.model';


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


  isLoginView: boolean = true;


  showLoginPassword: boolean = false;
  showRegisterPassword: boolean = false;
  showConfirmPassword: boolean = false;


  errorMessage: string = '';
  successMessage: string = '';


  registerObj: RegisterRequest & {
    confirmPassword: string;
  } = {

    username: '',
    email: '',
    password: '',
    confirmPassword: ''

  };


  loginObj: LoginRequest = {

    username: '',
    password: ''

  };


  onRegister() {

    this.errorMessage = '';
    this.successMessage = '';


    if (
      !this.registerObj.username ||
      !this.registerObj.email ||
      !this.registerObj.password ||
      !this.registerObj.confirmPassword
    ) {

      this.errorMessage =
        'Please fill out all required fields.';

      return;

    }


    if (
      this.registerObj.password !==
      this.registerObj.confirmPassword
    ) {

      this.errorMessage =
        'Passwords do not match.';

      return;

    }


    this.userService.register({

      username: this.registerObj.username,
      email: this.registerObj.email,
      password: this.registerObj.password

    })
    .subscribe({

      next: () => {

        this.successMessage =
          'Account created! Check your email for the verification code.';


        this.router.navigate(
          ['/verify'],
          {
            state: {
              email: this.registerObj.email
            }
          }
        );

      },


      error: (err) => {

        this.errorMessage =
          err.message ||
          'Registration failed. Please try again.';

      }

    });

  }


  onLogin() {

    this.errorMessage = '';
    this.successMessage = '';


    if (
      !this.loginObj.username ||
      !this.loginObj.password
    ) {

      this.errorMessage =
        'Please fill out all required fields.';

      return;

    }


    this.userService.login(this.loginObj)
      .subscribe({

        next: (res: LoginResponse) => {

          this.authService.setSession(
            res.token,
            res.username
          );


          this.router.navigateByUrl(
            'home'
          );

        },


        error: (err) => {

          this.errorMessage =
            err.message ||
            'Login failed. Please check your credentials and try again.';

        }

      });

  }


  switchView(isLogin: boolean) {

    this.isLoginView = isLogin;

    this.errorMessage = '';
    this.successMessage = '';

  }


  goToForgotPassword() {

    this.router.navigate([
      '/forgot-password'
    ]);

  }

}