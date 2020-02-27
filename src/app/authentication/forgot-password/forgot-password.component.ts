import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss', '../common-style/common.scss']
})
export class ForgotPasswordComponent implements OnInit {

  email: string = '';

  constructor(
    private router: Router,
    public authenticationService: AuthenticationService,
  ) { }

  ngOnInit(): void {
  }

  navigateToLogin() {
    this.router.navigateByUrl('auth/login');
  }

}
