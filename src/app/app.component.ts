import { Component, OnInit,OnDestroy } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
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
     
      startAt: 3,
      endAt: 4
    }
  });

   // /restaurants/1/features/1
   this.exists = this.af.database.object('/restaurants/1/features/1');

   this.exists.take(1).subscribe(x =>{
    if ( x && x.$value) console.log("Exists");
    else console.log("Does Not Exist");
   });

  } 
}
