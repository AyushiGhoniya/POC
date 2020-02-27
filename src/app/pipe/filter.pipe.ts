import { Pipe, PipeTransform, Injectable } from '@angular/core';
import { IProduct } from '../models/product.model';

@Pipe({
  name: 'filter'
})
@Injectable({
  "providedIn": "root"
}) 
export class FilterPipe implements PipeTransform {

  transform(items: IProduct[], searchText: string, supplier: string, category: string): IProduct[] {
    if (!items) {
      return []
    }
    
    return items.filter(item => {

      if(searchText && !supplier && !category) {
        if(
          item['name'].toString().toLowerCase().includes(searchText.toLowerCase()) ||
          item['id'].toString().toLowerCase().includes(searchText.toLowerCase())
          ) {
          return items
        }
      }

      if(!searchText && supplier && !category)
      {
        if(item['supplier'].toString().toLowerCase().includes(supplier.toLowerCase())) {
          return items
        }
      }

      if(!searchText && !supplier && category)
      {
        if(item['category'].toString().toLowerCase().includes(category.toLowerCase())) {
          return items
        }
      }

      if(searchText && supplier && !category) {
        return this.functionForSearchTextAndField(item, 'supplier', [searchText, supplier])
      }

      if(searchText && !supplier && category) {
        return this.functionForSearchTextAndField(item, 'supplier', [searchText, supplier])
      }

      if(!searchText && supplier && category) {
        if(
          item['supplier'].toString().toLowerCase().includes(supplier.toLowerCase()) &&
          item['category'].toString().toLowerCase().includes(category.toLowerCase())
        ) {
          return items
        }
      }

      if(searchText && supplier && category) {
        if(
          (item['name'].toString().toLowerCase().includes(searchText.toLowerCase()) ||
          item['id'].toString().toLowerCase().includes(searchText.toLowerCase())) &&
          item['supplier'].toString().toLowerCase().includes(supplier.toLowerCase()) &&
          item['category'].toString().toLowerCase().includes(category.toLowerCase())
        ) {
          return items
        }
      }

      if(!searchText && !supplier && !category) {
        return items
      }
    })
  }

  functionForSearchTextAndField(item, field, value: string[]) {
    if(
      (item['name'].toString().toLowerCase().includes(value[0].toLowerCase()) ||
        item['id'].toString().toLowerCase().includes(value[0].toLowerCase())) &&
        item[field].toString().toLowerCase().includes(value[1].toLowerCase())
      ) {
        return item
      }
  }
}
