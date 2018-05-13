import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { ProfileProvider } from '../../providers/profile/profile';
import { QuestionProvider } from '../../providers/question/question';

import firebase from 'firebase';


@Component({
  selector: "page-home",
  templateUrl: "home.html"
})

export class HomePage {
  public userProfile: any;

  public countryList: Array<any>;
  public loadedCountryList: Array<any>;
  public countryRef: firebase.database.Reference;

  public searchValue: string = "";
  public country: any = {};
  

  constructor(public navCtrl: NavController, public authProvider: AuthProvider, public profileProvider: ProfileProvider) {
    this.countryRef = firebase.database().ref('/countries');
    this.countryRef.on('value', countryList => {
      let countries = [];
      countryList.forEach(country => {
        countries.push(country.val());
        return false;
      });
      this.countryList = countries;
      this.loadedCountryList = countries;
    });
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


  initializeItems(): void {
    this.countryList = this.loadedCountryList;
  }

  getCountries(searchbar) {
    // Reset items back to all of the items
    this.initializeItems();
    // set q to the value of the searchbar
    var q = searchbar.srcElement.value;
    // if the value is an empty string don't filter the items
    if (!q) {
      return;
    }
    this.countryList = this.countryList.filter((v) => {
      if (v.name && q) {
        if (v.name.toLowerCase().indexOf(q.toLowerCase()) > -1) {
          return true;
        }
        return false;
      }
    });
    console.log(q, this.countryList.length);
  }

  updateCountry(Selcountry: string): void{
    
    this.userProfile.country = Selcountry;
    this.profileProvider.updateCountry(Selcountry);
    
    console.log('Selected country', Selcountry);
  }
 
  CreateQuestion(){
    this.navCtrl.push('QuestionCreatePage');
  }

}
