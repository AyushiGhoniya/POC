import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

import { RouterModule, Routes } from '@angular/router';
import { AuthenticationComponent } from './authentication.component';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '', 
    component: AuthenticationComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'signup',
        component: SignUpComponent
      },
      {
        path: 'forgotpassword',
        component: ForgotPasswordComponent
      }
    ]
  }
];

@NgModule({
  declarations: [
    AuthenticationComponent,
    SignUpComponent,
    LoginComponent,
    ForgotPasswordComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
  ]
})
export class AuthenticationModule { }
