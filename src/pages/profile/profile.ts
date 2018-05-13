import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController, Alert } from 'ionic-angular';
import { ProfileProvider } from '../../providers/profile/profile';
import { AuthProvider } from '../../providers/auth/auth';

//import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import firebase from 'firebase';

@IonicPage()
@Component({
  selector: "page-profile",
  templateUrl: "profile.html"
})
export class ProfilePage {
  public userProfile: any;
  public DOB: string;

  public interestList: Array<any>;
  //public loadedInterestList: Array<any>;
  public interestRef: firebase.database.Reference;

  public gender: string;
  

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public authProvider: AuthProvider, public profileProvider: ProfileProvider) {

  }

  ionViewDidLoad() {
    this.profileProvider.getUserProfile().on("value", userProfileSnapshot => {
      this.userProfile = userProfileSnapshot.val();
      this.DOB = userProfileSnapshot.val().DOB;
      this.interestList = userProfileSnapshot.val().interestList;
      this.gender = userProfileSnapshot.val().gender;
    });

  }

  logOut(): void {
    this.authProvider.logoutUser().then(() => {
      this.navCtrl.setRoot("LoginPage");
    });
  }

  updateName(): void {
    const alert: Alert = this.alertCtrl.create({
      message: "Your fist & last name",
      inputs: [
        {
          name: "firstName",
          placeholder: "Your first name",
          value: this.userProfile.firstName
        },
        {
          name: "lastName",
          placeholder: "Your last name",
          value: this.userProfile.lastName
        }
      ],
      buttons: [
        { text: "Cancel" },
        {
          text: "Save",
          handler: data => {
            this.profileProvider.updateName(data.firstName, data.lastName);
          }
        }
      ]
    });
    alert.present();
  }

  updateDOB(DOB: string): void {
    this.profileProvider.updateDOB(DOB);
  }


  updateEmail(): void {
    let alert: Alert = this.alertCtrl.create({
      inputs: [{ name: 'newEmail', placeholder: 'Your new email' },
      { name: 'password', placeholder: 'Your password', type: 'password' }],
      buttons: [
        { text: 'Cancel' },
        {
          text: 'Save',
          handler: data => {
            this.profileProvider
              .updateEmail(data.newEmail, data.password)
              .then(() => { console.log('Email Changed Successfully'); })
              .catch(error => { console.log('ERROR: ' + error.message); });
          }
        }]
    });
    alert.present();
  }

  updatePassword(): void {
    let alert: Alert = this.alertCtrl.create({
      inputs: [
        { name: 'newPassword', placeholder: 'New password', type: 'password' },
        { name: 'oldPassword', placeholder: 'Old password', type: 'password' }
      ],
      buttons: [
        { text: 'Cancel' },
        {
          text: 'Save',
          handler: data => {
            this.profileProvider.updatePassword(
              data.newPassword,
              data.oldPassword
            );
          }
        }
      ]
    });
    alert.present();
  }

  updateInterests(interestList): void {
    /*let alert: Alert = this.alertCtrl.create({
      inputs: [
        {
          name: 'newInterest',
          placeholder: "Your interest",
          value: this.userProfile.interestList
        }
      ],
      buttons: [
        { text: 'Cancel' },
        {
          text: 'Save',
          handler: data => {
            this.profileProvider.updateInterests(
              data.newInterest
            );
          }
        }
      ]
    });
    alert.present();*/
    
    this.userProfile.interestList = interestList;
    this.profileProvider.updateInterests(interestList);
    console.log('Selected', interestList);

  }

  updateGender(gender): void {
    let alert: Alert = this.alertCtrl.create({
      inputs: [
        {
          name: 'newGender',
          placeholder: "Your Gender",
          value: this.userProfile.gender
        }
      ],
      buttons: [
        { text: 'Cancel' },
        {
          text: 'Save',
          handler: data => {
            this.profileProvider.updateGender(
              data.newGender
            );
          }
        }
      ]
    });
    alert.present();
  }


  genderUpdate(value: any): void {
    console.log('Selected gender', value);

   
    this.userProfile.gender = value;
  }

}
