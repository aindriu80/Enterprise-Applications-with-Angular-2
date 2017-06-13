// src/app/auth/auth.service.ts

import { Injectable } from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';

declare var Auth0Lock: any; 

@Injectable()
export class Auth {
  lock = new Auth0Lock('HXx0xWMWLGq0sYsG4P2R8nUHMRiXyi4J','aindriu80.eu.auth0.com', {});





  constructor() {
    this.lock.on('authenticated',authResult =>{
      localStorage.setItem('token', authResult.idToken);
    });
  }

  public login() {
    this.lock.show();
  }
  public isAuthenticated(){
    return tokenNotExpired();
  }
  public logout(){
    localStorage.removeItem('token');
  }
}