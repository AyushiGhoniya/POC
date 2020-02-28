import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { IUser } from 'src/app/models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss', '../common-style/common.scss']
})
export class LoginComponent implements OnInit {

  // email: string = '';
  // password: string = '';

  user: IUser = {
    id: '',
    userName: '',
    email: '',
    password: '',
    confirmPassword: ''
  }
  
  constructor(
    private router: Router,
    public authenticationService: AuthenticationService
    ) { }

  ngOnInit(): void {
    
  }

  login(formData) {
    this.authenticationService.Login(formData);
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
