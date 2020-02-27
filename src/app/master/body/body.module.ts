import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductComponent } from './product/product.component';
import { OrderComponent } from './order/order.component';
import { StockGridComponent } from './stock-grid/stock-grid.component';
import { BodyComponent } from './body.component';

import { Routes, RouterModule } from '@angular/router';

//Ngb-bootstrap
import { NgbModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { CoreModule } from 'src/app/core/core.module';

const routes: Routes = [
  {
    path: '', 
    component: BodyComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'product',
        component: ProductComponent
      },
      {
        path: 'order',
        component: OrderComponent
      },
      {
        path: 'stockgrid',
        component: StockGridComponent
      }
    ]
  }
];

@NgModule({
  declarations: [
    BodyComponent,
    DashboardComponent,
    ProductComponent, 
    OrderComponent, 
    StockGridComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    RouterModule.forChild(routes),
    NgbModule,
    NgbPaginationModule,
    FormsModule
  ]
})
export class BodyModule { }
