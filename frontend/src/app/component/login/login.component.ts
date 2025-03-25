import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../service/user/user.service';
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

  isLoginView: boolean = false;
  errorMessage: string = '';

  registerObj: any = {
    'username': '',
    'password': ''
  }

  loginObj: any = {
    'username': '',
    'password': ''
  }


  onRegister() {

    if(!this.registerObj.username || !this.registerObj.password) {
      this.errorMessage = 'Please fill out all required fields.';
      return;
    }
   
    this.userService.register(this.registerObj).subscribe((res:any) => {
      if(res && res.username == this.registerObj.username) {
        alert("Registration success");
        localStorage.setItem('isLoggedIn', 'true');
        this.isLoginView = true;
      }
      else {
        alert("registration failure");
      }
    });

  }


  onLogin() {

    if (!this.loginObj.username || !this.loginObj.password) {
      this.errorMessage = 'Please fill out all required fields.';
      return;
    }

    this.userService.login(this.loginObj).subscribe((res:any) => {
      if(res && res.username == this.loginObj.username) {
        alert("Login success");
        this.router.navigateByUrl('dashboard')
      }
      else {
        alert("Credentials do not match.");
      }
    });

  }


  switchView(isLogin: boolean) {
    this.isLoginView = isLogin;
    this.errorMessage = '';
  }


  isLoggedIn(): boolean {
    return localStorage.getItem('isLoggedIn') == 'true';
  }
  
}