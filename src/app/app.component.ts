import { Component, OnInit,OnDestroy } from '@angular/core';
import { AngularFire, FirebaseListObservable, AuthProviders, AuthMethods } from 'angularfire2';
import { Observable } from 'rxjs/observable';
import { Http } from '@angular/http';
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
  displayName;
  photoUrl;
  error;

  constructor(private af: AngularFire, private http: Http){
   
  }

  ngOnInit(){
    this.af.auth.subscribe(authState =>{
      if(!authState){
        this.displayName = null;
        this.photoUrl = null;
        authState.uid; 
        return;
      }

      let userRef = this.af.database.object('/users/'+ authState.uid);
      userRef.subscribe(user => {
      let url = `https://graph.facebook.com/v2.8/${authState.facebook.uid}?fields=first_name,last_name&access token=${user.accessToken}`;
      this.http.get(url).subscribe(response => {
        let user = response.json();
        userRef.update({
          firstName: user.first_name,
          lastName: user.last_name
          });
        });
       });
       

        this.displayName=authState.auth.displayName;
        this.photoUrl = authState.auth.photoURL;      
    
    });

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
    method: AuthMethods.Popup,
    scope:['email','public_profile','user_friends']
  }).then((authState: any) => {
   this.af.database.object('/users/'+ authState.uid).update({
     accessToken: authState.facebook.accessToken
   })
  });
}

logout(){
  this.af.auth.logout();
}

register(){
  this.af.auth.createUser({
    email: 'aindriu80@gmail.com',
    password: 'jamesbond007'
  })
  .then(authState =>{
    authState.auth.sendEmailVerification();
  })
  .catch(error => console.log("REGISTER-ERROR", error));
}
emailLogin(){
this.af.auth.login({
  email: 'aindriu80@gmail.com',
  password: 'jamesbond007'
}, {
  method: AuthMethods.Password,
  provider: AuthProviders.Password
})
.then(authState => console.log("LOGIN-THEN", authState))
.catch(error => this.error = error.message);
}
emailLogout(){
  this.af.auth.logout();
}
}
