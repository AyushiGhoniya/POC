import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { IUser } from 'src/app/models/user.model';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss', '../common-style/common.scss']
})
export class SignUpComponent implements OnInit {

  // email: string = '';
  // password: string = '';
  // confirmPassword: string = '';

  user: IUser = {
    id: '',
    userName: '',
    email: '',
    password: '',
    confirmPassword: ''
  }

  constructor(
    private route: Router,
    public authenticationService: AuthenticationService
  ) { }

  ngOnInit(): void {
  }

  //click on register here
  navigateToLogin() {
    this.route.navigateByUrl('auth/login');
  }
}
