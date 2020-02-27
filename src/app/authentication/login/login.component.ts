import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss', '../common-style/common.scss']
})
export class LoginComponent implements OnInit {

  email: string = '';
  password: string = '';

  constructor(
    private router: Router,
    public authenticationService: AuthenticationService
    ) { }

  ngOnInit(): void {
    
  }

  //click on create account
  navigateToSignUp() {
    this.router.navigateByUrl('auth/signup')
  }

  //click on forgot password
  navigateToForgotPassword() {
    this.router.navigateByUrl('auth/forgotpassword')
  }

}
