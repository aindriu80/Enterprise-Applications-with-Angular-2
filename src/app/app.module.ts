import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AngularFireModule} from 'angularfire2';

import { AppComponent } from './app.component';

import { Auth } from './auth.service';

import { AUTH_PROVIDERS} from 'angular2-jwt';

  export const firebaseConfig = {
  apiKey: "AIzaSyAOD872mFctgQiDOVdAdZwG7eGRljhJbLM",
    authDomain: "pepper-47154.firebaseapp.com",
    databaseURL: "https://pepper-47154.firebaseio.com",
    projectId: "pepper-47154",
    storageBucket: "pepper-47154.appspot.com",
    messagingSenderId: "1011251873128"
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
     AngularFireModule.initializeApp(firebaseConfig)
   
  ],
  providers: [Auth, AUTH_PROVIDERS ],
  bootstrap: [AppComponent]
})
export class AppModule { }
