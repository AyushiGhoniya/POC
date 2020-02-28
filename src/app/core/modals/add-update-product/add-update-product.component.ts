import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';
import { ProductService } from 'src/app/services/product.service';
import { FormBuilder, Validators } from '@angular/forms';
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'app-add-update-product',
  templateUrl: './add-update-product.component.html',
  styleUrls: ['./add-update-product.component.scss']
})
export class AddUpdateProductComponent implements OnInit {

  showDiscount: boolean = true;

  constructor(
    public modalService: ModalService,
    private productService: ProductService,
    private fb: FormBuilder,
    private angularFireDatabase: AngularFireDatabase
  ) { }

  addUpdateProductForm = this.fb.group({
    id: [],
    name: ["", Validators.required],
    supplier: ["", Validators.required],
    category: ["", Validators.required],
    price: ["", Validators.required],
    discounted: ["", Validators.required],
    discount: [""]
  })

  ngOnInit(): void {
    if(this.modalService.formProperty=='edit') {
      this.addUpdateProductForm.patchValue(this.modalService.fetchedProduct)
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
        this.addUpdateProductForm.patchValue({
          id: prodcuts.length + 1
        })
        this.productService.addOrUpdateProduct(this.addUpdateProductForm.value);
        sub.unsubscribe()
      })
    }
    if(this.modalService.formProperty=='edit') {
      if(window.confirm('Are you sure, you want to update?')){
        this.productService.addOrUpdateProduct(this.addUpdateProductForm.value);
      }
    }

    this.modalService.hideModal('productModal');

  }

}
