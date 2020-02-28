import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Router } from '@angular/router';
import { IProduct } from "../models/product.model";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private _url: string ="https://poc-bacancy-abe93.firebaseio.com/products.json";

  constructor(
    private http: HttpClient,
    private router: Router,
    private angularFireDatabase: AngularFireDatabase
  ) { }

  //get all products
  getProductList() {
    return this.angularFireDatabase.list<IProduct>('/products').valueChanges()
  }

  //get all products
  // getProductListFromFirebase(start, end) {
  //   return this.angularFireDatabase.list<IProduct>('/products', ref => ref.orderByChild('id').startAt(start).endAt(end)).valueChanges()
  // }

  //get supplier and category array
  getSuppliersOrCategories(property) {
    property = property.filter((value, index) => {
      if(index != 0) {
        if(property.slice(0, index).indexOf(value) == -1) {
          return value
        }
      } else {
        return value
      }
    })
    return property
  }

  //get all products with url
  getData(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(this._url)
  }

  //add product using firebase
  addOrUpdateProduct(product){
    this.angularFireDatabase.object('/products/' + (product.id - 1)).set(product)
  }
}
