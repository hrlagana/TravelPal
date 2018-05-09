import { Component } from '@angular/core';
import { IonicPage, NavController, Alert, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Loading, LoadingController } from 'ionic-angular';
import { Validators } from '@angular/forms';
import { EmailValidator } from '../../validators/email';
import { AuthProvider } from '../../providers/auth/auth';
import { HomePage } from '../home/home';

import firebase from 'firebase';
/*import { FormControl } from '@angular/forms';*/

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  public signupForm: FormGroup;
  public loading: Loading;

  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController, public alertCtrl: AlertController, public authProvider: AuthProvider, formBuilder: FormBuilder) {
    

    this.signupForm = formBuilder.group({
      "firstName": [
        '', Validators.compose([Validators.required, Validators.maxLength(15)])
      ],
      "lastName": [
        '', Validators.compose([Validators.required, Validators.maxLength(15)])
      ],
      "email": [
        '', Validators.compose([Validators.required, EmailValidator.isValid])
      ],
      "password": [
        '', Validators.compose([Validators.required, Validators.minLength(6)])
      ],
      "gender": [
        '', Validators.required
      ],
      "DOB": [
        '', Validators.required
      ],
      "country":[
        '', Validators.required
      ]
    });


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  signupUser() {
    if (!this.signupForm.valid) {
      console.log(
        `Need to complete the form, current value: ${this.signupForm.value}`
      );
    } else {
      const firstName: string = this.signupForm.value.firstName;
      const lastName: string = this.signupForm.value.lastName;
      const email: string = this.signupForm.value.email;
      const password: string = this.signupForm.value.password;
      const gender: string = this.signupForm.value.gender;
      const DOB: string = this.signupForm.value.DOB;
      const country: string = this.signupForm.value.country;

      this.authProvider.signupUser(firstName, lastName, email, password, gender, DOB, country).then(user => {
        this.loading.dismiss().then(() => {
          this.navCtrl.setRoot(HomePage);
        });
      }, error => {
        this.loading.dismiss().then(() => {
          const alert: Alert = this.alertCtrl.create({
            message: error.message,
            buttons: [{ text: "Ok", role: "cancel" }]
          });

          alert.present();
        });
      });

      this.loading = this.loadingCtrl.create({ content: "Signing Up" });
      this.loading.present();
    }
  }
  
}