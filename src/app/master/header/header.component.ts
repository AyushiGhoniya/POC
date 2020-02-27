import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalService } from 'src/app/services/modal.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  navbarOpen: boolean = false;

  constructor(
    private router: Router,
    private modalService: ModalService,
    private location: Location
  ) { }

  ngOnInit(): void {
  }

  toogleNavbar() {
    this.navbarOpen =! this.navbarOpen;
  }

  showProfileModal() {
    // this.modalService.showProfileModal = true;
    // this.modalService.userId = window.localStorage.getItem('uid');
    // this.location.go('/poc/profile')
  }

  logout() {
    localStorage.removeItem('uid')
    this.router.navigateByUrl('/auth/login')
  }

}
