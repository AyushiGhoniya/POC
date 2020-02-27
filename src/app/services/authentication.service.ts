import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/database';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    private router: Router,
    private angularFireDatabase: AngularFireDatabase,
    private angularFireAuth: AngularFireAuth,
    private toastService: ToastService
  ) { }

  //onSubmit signUp form event
  SignUp(formData) {
    this.angularFireAuth.auth.createUserWithEmailAndPassword(
      formData.value.email, formData.value.password
    ).
    then(
      () => {
        this.angularFireDatabase.object('/users/' + this.angularFireAuth.auth.currentUser.uid + '/userDetails').set({
          eamil: formData.value.email
        })
        this.router.navigateByUrl('auth/login')
      }
    ).
    catch(
      (error) => {
        alert(error['message'])
      }
    )
  }

  //onSubmit login form event 
  Login(formData) {
    localStorage.setItem('uid', this.angularFireAuth.auth.currentUser.uid)
    this.angularFireAuth.auth.signInWithEmailAndPassword(
      formData.value.email, formData.value.password
    ).
    then(
      () => {
        this.router.navigateByUrl('poc/dashboard');
      }
    ).
    catch(
      (error) => {
        alert(error['message']);
      }
    )
  }

  //onSubmit forgot password form event 
  ForgotPassword(formData) {
    this.angularFireAuth.auth.sendPasswordResetEmail(
      formData.value.email
    ).
    then(
      () => {
        this.toastService.success('Link has been sent to your email.', 'Reset Password', 2000);
        this.router.navigateByUrl('auth/login')
      }
    ).
    catch(
      (error) => {
        alert(error['message']);
      }
    )
  }

}
