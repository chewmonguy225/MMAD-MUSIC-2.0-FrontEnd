import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { UserService } from '../../../../service/user/user.service';

@Component({
  selector: 'app-verify-page',
  standalone: true,
  imports: [
    FormsModule,
    NgIf
  ],
  templateUrl: './verify-page.component.html',
  styleUrls: ['./verify-page.component.css']
})
export class VerifyPageComponent implements OnInit {

  router = inject(Router);
  userService = inject(UserService);

  email: string = '';
  code: string = '';

  errorMessage: string = '';
  successMessage: string = '';


  ngOnInit() {

    const navigation = this.router.getCurrentNavigation();

    this.email =
      navigation?.extras?.state?.['email'] ||
      history.state?.email ||
      '';

  }


  verifyAccount() {

    this.errorMessage = '';
    this.successMessage = '';


    if (!this.email || !this.code) {

      this.errorMessage =
        'Please enter your email and verification code.';

      return;

    }


    this.userService.verifyUser({
      email: this.email,
      code: this.code

    }).subscribe({

      next: () => {

        this.successMessage =
          'Account verified successfully!';


        setTimeout(() => {

          this.router.navigate(['/login']);

        }, 1500);

      },


      error: (err: HttpErrorResponse) => {

        console.error(
          'Verification error:',
          err
        );


        this.errorMessage =
          err.error?.message ||
          err.message ||
          'Invalid verification code.';

      }

    });

  }

}