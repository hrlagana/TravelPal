import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { ProfileProvider } from '../../providers/profile/profile';


@Component({
  selector: "page-home",
  templateUrl: "home.html"
})

export class HomePage {
  public userProfile: any;



  constructor(public navCtrl: NavController, public authProvider: AuthProvider, public profileProvider: ProfileProvider) { 
    
  }

  goToProfile(): void {
    this.navCtrl.push("ProfilePage");
  }

  logOut(): void {
    this.authProvider.logoutUser().then(() => {
      this.navCtrl.setRoot("LoginPage");
    });
  }

  goToCreate(): void {
    this.navCtrl.push('EventCreatePage');
  }

  goToList(): void {
    this.navCtrl.push('EventListPage');
  }

  ionViewDidLoad() {
    this.profileProvider.getUserProfile().on("value", userProfileSnapshot => {
      this.userProfile = userProfileSnapshot.val();
    });
  }

  
}
