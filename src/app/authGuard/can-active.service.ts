import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CanActiveService implements CanActivate {

  constructor(private router: Router) { }

  canActivate(): boolean {
    if(localStorage.getItem("uid") == '') {
      return true;
    } else {
      this.router.navigateByUrl('poc/dashboard');
      return false;
    }
  }
}
