import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MasterComponent } from './master.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '', 
    component: MasterComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./body/body.module').then(module => module.BodyModule)
      }
    ]
  }
];

@NgModule({
  declarations: [
    MasterComponent,
    HeaderComponent, 
    FooterComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class MasterModule { }
