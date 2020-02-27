import { Injectable } from '@angular/core';
import { Router, CanLoad } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CanLoadService implements CanLoad {

  constructor(private router: Router) { }

  canLoad(): boolean {
    if(localStorage.getItem("uid")) {
      return true;
    } else {
      this.router.navigate(['/auth/login']);
      return false;
    }
  }
}
