import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { IProduct } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  fetchedProduct: IProduct;
  showAddUpdateModal: boolean = false;
  formProperty: string;
  userId: any ;

  constructor(
    private location: Location
  ) { }

  showModal(product: IProduct) {
    this.showAddUpdateModal = true;
    let body = document.body;
    body.style.overflow = 'hidden';
    if(product) {
      this.formProperty = 'edit';
      this.fetchedProduct = product;
    } else {
      this.formProperty = 'add';
    }
    // body.style.overflow = "hidden"
  }

  hideModal(modal) {
    this.showAddUpdateModal = false;
    let body = document.body;
    this.location.go('/poc/product')
    // body.style.overflow = "auto"
  }
}
