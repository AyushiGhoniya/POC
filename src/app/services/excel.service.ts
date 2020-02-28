import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ExcelService {

  constructor() { }

  expoerToExcel(file: string, columns: string[], item) {
    let header = columns.join(',');

    let excel = header;
    excel += '\r\n';

    item.map(product => {
      excel += [product['id'], product['name'], product['supplier'], product['category'], product['price'], product['discounted'], product['discount']];
      excel += '\r\n';
    })

    let blob = new Blob([excel], { type: "application/vnd.ms-excel" });
    var tag = document.createElement('a');

    var url = URL.createObjectURL(blob);
    tag.setAttribute('href', url);
    tag.setAttribute('download', file);
    document.body.appendChild(tag);
    tag.click();
    document.body.removeChild(tag);
  }
}
