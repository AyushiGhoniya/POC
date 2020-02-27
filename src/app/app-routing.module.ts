import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanActiveService } from './authGuard/can-active.service';
import { CanLoadService } from './authGuard/can-load.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    loadChildren: () => import('./authentication/authentication.module').then(module => module.AuthenticationModule),
    // canActivate: [CanActiveService]
  },
  {
    path: 'poc',
    loadChildren: () => import('./master/master.module').then(module => module.MasterModule),
    canLoad: [CanLoadService]
  }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
