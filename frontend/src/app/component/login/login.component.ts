import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../service/user/user.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  router = inject(Router);
  http = inject(HttpClient);
  userService = inject(UserService);

  isLoginView: boolean = false;

  registerObj: any = {
    username: '',
    password: ''
  }

  loginObj: any = {
    username: '',
    password: ''
  }

  onRegister() {
   
    this.userService.register(this.registerObj).subscribe((res:any) => {
      if(res && res.username == this.registerObj.username) {
        alert("Registration success");
        this.isLoginView = true;
      }
      else {
        alert();
      }
    });

  }


  onLogin() {

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
  
}