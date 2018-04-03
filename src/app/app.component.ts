import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import firebase from 'firebase';
import { firebaseConfig } from './credentials';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any;
   
  constructor(platform: Platform,statusBar: StatusBar,splashScreen: SplashScreen) {
    firebase.initializeApp(firebaseConfig);
    firebase
  .auth()
  .getRedirectResult()
  .then(function(result) {
    if (result.credential) {
      var token = result.credential.accessToken;
      var user = result.user;
      console.log(token, user);
    }
  })
  .catch(function(error) {
    // Handle Errors here.
    var errorMessage = error.message;
    console.log(errorMessage);
  });
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      if (!user) {
        this.rootPage = 'LoginPage';
        unsubscribe();
      } else {
          this.rootPage = HomePage;
          unsubscribe();
      }
    });

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
    
}

