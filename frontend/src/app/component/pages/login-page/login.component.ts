import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
import {
  UserService,
  RegisterRequest,
  LoginRequest
} from '../../../service/user/user.service';
import { AuthService } from '../../../service/user/auth/auth.service';
import { LoginResponse } from '../../../core/dto/login-response.model';

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

  registerObj: RegisterRequest = {
    username: '',
    email: '',
    password: ''
  };


  loginObj: LoginRequest = {
    username: '',
    password: ''
  };


  onRegister() {

    this.errorMessage = '';

    if (
      !this.registerObj.username ||
      !this.registerObj.email ||
      !this.registerObj.password
    ) {

      this.errorMessage = 'Please fill out all required fields.';
      return;

    }


    this.userService.register(this.registerObj)
      .subscribe({

        next: (res) => {

          console.log(
            'Registration success:',
            res
          );


          alert(
            'Account created! Check your email for the verification code.'
          );


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

          console.error(
            'Registration error:',
            err
          );


          this.errorMessage =
            err.message ||
            'Registration failed. Please try again.';

        }

      });

  }


  onLogin() {

    this.errorMessage = '';

    if (
      !this.loginObj.username ||
      !this.loginObj.password
    ) {

      this.errorMessage = 'Please fill out all required fields.';
      return;

    }


    this.userService.login(this.loginObj)
      .subscribe({

        next: (res: LoginResponse) => {


          console.log(
            'Login success response:',
            res
          );


          this.authService.setSession(
            res.token,
            res.username
          );


          console.log(
            'Logged in user:',
            res.username
          );


          alert(
            'Login success'
          );


          this.router.navigateByUrl(
            'home'
          );

        },


        error: (err) => {


          console.error(
            'Login error:',
            err
          );


          this.errorMessage =
            err.message ||
            'Login failed. Please check your credentials and try again.';

        }

      });

  }


  switchView(isLogin: boolean) {

    this.isLoginView = isLogin;
    this.errorMessage = '';

  }

}