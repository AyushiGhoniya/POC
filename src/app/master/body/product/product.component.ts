import { Component, OnInit, Input } from '@angular/core';
import { IProduct } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';
import { FilterPipe } from 'src/app/pipe/filter.pipe';
import { ModalService } from 'src/app/services/modal.service';
import { Location } from '@angular/common';
import { ExcelService } from 'src/app/services/excel.service';


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
  collectionSize : number;
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
    private location: Location,
    private excelService: ExcelService
  ) { }

  ngOnInit(): void {
    this.pageChange()
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

  //popup Add/Edit product form
  showAddUpdateProductForm(product?: IProduct) {
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

  

  exportToExcel() {
    let file = 'Products_List.csv';
    let columns = ['Id', 'Name', 'Supplier', 'Category', 'Price', 'Discounted', 'Discount'];
    this.excelService.expoerToExcel(file, columns, this.products.slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize))
  }  

}
