import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';

//Modules
import { AuthenticationModule } from './authentication/authentication.module';
import { MasterModule } from './master/master.module';

//Firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


var firebaseConfig = {
  apiKey: "AIzaSyAEHVySMAgnuiN9faLBF8Y5vgYWPEKzWxg",
  authDomain: "poc-bacancy-abe93.firebaseapp.com",
  databaseURL: "https://poc-bacancy-abe93.firebaseio.com",
  projectId: "poc-bacancy-abe93",
  storageBucket: "poc-bacancy-abe93.appspot.com",
  messagingSenderId: "613859620592",
  appId: "1:613859620592:web:6ca4fa3096a78584dc7435",
  measurementId: "G-ND8JSSP96L"
};

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AuthenticationModule,
    MasterModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
