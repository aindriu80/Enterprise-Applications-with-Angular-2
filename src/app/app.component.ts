import { Component, OnInit,OnDestroy } from '@angular/core';
import { AngularFire, FirebaseListObservable, AuthProviders, AuthMethods } from 'angularfire2';
import { Observable } from 'rxjs/observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';
  cuisines: FirebaseListObservable<any[]>;
  restaurants: Observable<any[]>;
  exists;

  constructor(private af: AngularFire){
   
  }

  ngOnInit(){

  this.cuisines = this.af.database.list('/cuisines',{
    query: {
      orderByValue: true
    }
  });
  this.restaurants = this.af.database.list('/restaurants',{
    query:{
      orderByChild: 'rating',
     equalTo: 5,
     limitToFirst: 50
    }
  });

   // /restaurants/1/features/1
   this.exists = this.af.database.object('/restaurants/1/features/1');

   this.exists.take(1).subscribe(x =>{
    if ( x && x.$value) console.log("Exists");
    else console.log("Does Not Exist");
   });

   // /restaurants
   // /restaurants-by-city/camberwell

   this.af.database.list('/restaurants').push({ name: ''})
   .then(x => {
    // x.key
    let restaurant = { name: 'My New Restaurant'};
    let update = {};
    update['restaurants/' + x.key] = null;
    update['restaurants-by-city/camberwell' + x.key] = null;

    this.af.database.object('/').update(update);
   });
  } 

login(){
  this.af.auth.login({
    provider: AuthProviders.Facebook,
    method: AuthMethods.Popup
  }).then(authState => {
    console.log("After Login", authState);
  });
}

logout(){
  this.af.auth.logout();
  }
}
