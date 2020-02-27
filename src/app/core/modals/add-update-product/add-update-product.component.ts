import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';
import { ProductService } from 'src/app/services/product.service';
import { FormGroup,FormControl,FormBuilder, Validators } from '@angular/forms';
import { IProduct } from 'src/app/models/product.model';
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'app-add-update-product',
  templateUrl: './add-update-product.component.html',
  styleUrls: ['./add-update-product.component.scss']
})
export class AddUpdateProductComponent implements OnInit {

  product: IProduct;

  productLength: number;
  suppliers: IProduct;
  categories: IProduct;
  data: IProduct;
  productId: number;
  showDiscount: boolean = true;
  id: number;

  constructor(
    public modalService: ModalService,
    private productService: ProductService,
    private fb: FormBuilder,
    private angularFireDatabase: AngularFireDatabase
  ) { }

  addUpdateProductForm = this.fb.group({
    name: ["", Validators.required],
    supplier: ["", Validators.required],
    category: ["", Validators.required],
    price: ["", Validators.required],
    discounted: ["", Validators.required],
    discount: [""]
  })

  ngOnInit(): void {
    if(this.modalService.formProperty=='edit') {
      this.addUpdateProductForm.patchValue({
        name: this.modalService.fetchedProduct.name,
        supplier: this.modalService.fetchedProduct.supplier,
        category: this.modalService.fetchedProduct.category,
        price: this.modalService.fetchedProduct.price,
        discounted: this.modalService.fetchedProduct.discounted,
        discount: this.modalService.fetchedProduct.discount
      })
      if(this.modalService.fetchedProduct.discounted == 'No') {
        this.showDiscount = false
      }
    }
    else {
      this.showDiscount = false
    }
  }

  isShowDiscount(event)
  {
   if(event.target.value=='Yes')
   {
     this.showDiscount=true
   }  
   else
   {
    this.showDiscount=false 
   }
  }

  addUpdateProduct() {

    if(this.modalService.formProperty=='add') {
      let sub = this.angularFireDatabase.list('/products').valueChanges().subscribe(prodcuts => {
        this.product = {
          id: prodcuts.length + 1,
          name: this.addUpdateProductForm.controls['name'].value,
          supplier: this.addUpdateProductForm.controls['supplier'].value,
          category: this.addUpdateProductForm.controls['category'].value,
          discounted: this.addUpdateProductForm.controls['discounted'].value,
          price: this.addUpdateProductForm.controls['price'].value,
          discount: this.addUpdateProductForm.controls['discount'].value,
        }
        this.productService.addProduct(this.product);
        sub.unsubscribe()
      })
    }
    if(this.modalService.formProperty=='edit') {
      if(window.confirm('Are you sure, you want to update?')){
        let sub = this.angularFireDatabase.list('/products').valueChanges().subscribe(prodcuts => {
          this.product = {
            id: this.modalService.fetchedProduct.id,
            name: this.addUpdateProductForm.controls['name'].value,
            supplier: this.addUpdateProductForm.controls['supplier'].value,
            category: this.addUpdateProductForm.controls['category'].value,
            discounted: this.addUpdateProductForm.controls['discounted'].value,
            price: this.addUpdateProductForm.controls['price'].value,
            discount: this.addUpdateProductForm.controls['discount'].value,
          }
          this.productService.updateProduct(this.product);
          sub.unsubscribe()
        })
      }
    }

    this.modalService.hideModal('productModal');

  }

}
