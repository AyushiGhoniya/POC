import { Component, OnInit, Input } from '@angular/core';
import { IProduct } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';
import { FilterPipe } from 'src/app/pipe/filter.pipe';
import { ModalService } from 'src/app/services/modal.service';
import { Location } from '@angular/common';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  property: string;
  searchText: string;

  products: IProduct[] = [];
  filteredProducts: IProduct[] = [];
  page: number = 1;
  pageSize : number = 10;
  collectionSize : number = 60;
  start: number;
  end: number;

  suppliers: [];
  selectedSupplier: string;
  categories: [];
  selectedCategory: string;


  constructor(
    private productService: ProductService,
    private filter: FilterPipe,
    public modalService: ModalService,
    private location: Location
  ) { }

  ngOnInit(): void {

    this.pageChange()
    // this.productService.getData().subscribe(data => {
    //   this.products = data;
    //   console.log(data.length)
    // })
  }

  //Filtered Products for input tag
  getFilteredProducts(event, property?) {
    if(property == 'supplier') {
      this.selectedSupplier = event.target.value
      if(this.selectedSupplier == 'Supplier') {
        this.selectedSupplier = '';
      }
    } if(property == 'category') {
      this.selectedCategory = event.target.value
      if(this.selectedCategory == 'Category') {
        this.selectedCategory = '';
      }
    }

    this.products = this.filter.transform(this.filteredProducts, this.searchText, this.selectedSupplier, this.selectedCategory);
    this.collectionSize = this.products.length
    console.log(this.products)
  }

  //
  showAddUpdateModal(product?: IProduct) {
    if(product)
    {
      console.log('edit :: ' + product.id + ', ' + product.name)
      this.location.go('/poc/product/edit/' + product.id)
    } else {
      console.log('add')
      this.location.go('/poc/product/add')
    }
    this.modalService.showModal(product)
  }

  //Pagination event binding
  pageChange() {
    this.productService.getProductList().subscribe(data => {
      this.collectionSize = data.length
      this.products = data;
      this.filteredProducts = data;
      this.suppliers = this.productService.getSuppliersOrCategories(data.map(value => value['supplier']));
      this.categories = this.productService.getSuppliersOrCategories(data.map(value => value['category']));
    })
  }

  //Add Product to Firedatabase
  /*addData() {
    this.product = {
      id: 100,
      name: "aaaaaa",
      supplier: "bbbbbbb",
      category: "ccccccc",
      price: 30000,
      discounted: "Yes",
      discount: 5
    }

    this.productService.addData(this.product).subscribe(data => {
      console.log(this.product)
      console.log("sucess");
    })
  }*/

  

}
