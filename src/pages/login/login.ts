import { Component } from '@angular/core';
import {
Alert,
AlertController,
IonicPage,
Loading,
LoadingController,
NavController} from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmailValidator } from '../../validators/email';
import { AuthProvider } from '../../providers/auth/auth';
import { HomePage } from '../home/home';
import firebase from 'firebase';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  public loginForm: FormGroup;
  public loading: Loading;
  /*###*/
  public userProfile:any = null;
  /*###*/
  constructor(
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public authProvider: AuthProvider,
    formBuilder: FormBuilder) {
      this.loginForm = formBuilder.group({
        email: ['',Validators.compose([Validators.required, EmailValidator.isValid])
        ],
        password: ['',Validators.compose([Validators.required, Validators.minLength(6)])
        ]
      });
      /*###*/
      firebase.auth().onAuthStateChanged( user => {
        if (user) {
          console.log(user);
          this.userProfile = user;
        } else {
          console.log("There's no user here");
        }
      });
      /*###*/
  }

  /*ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }*/
  goToSignup():void {
    this.navCtrl.push('SignupPage');
  }

  goToResetPassword():void {
    this.navCtrl.push('ResetPasswordPage');
  }

  loginUser(): void {
    if (!this.loginForm.valid) {
      console.log(`Form is not valid yet, current value: ${this.loginForm.value}`);
    } else {
      const email = this.loginForm.value.email;
      const password = this.loginForm.value.password;

      this.authProvider.loginUser(email, password).then(authData => {
        this.loading.dismiss().then(() => {
          this.navCtrl.setRoot(HomePage);
        });
      }, error => {
        const alert: Alert = this.alertCtrl.create({
          message: error.message,
          buttons: [{text: 'Ok', role: 'cancel'}]
        });

        this.loading.dismiss();
        alert.present();
      });

      this.loading = this.loadingCtrl.create({content: "Logging In"});
      this.loading.present();
    }
  }
  /*###*/
  googleLogin():void {
    const provider = new firebase.auth.GoogleAuthProvider();
  
    firebase.auth().signInWithRedirect(provider).then( () => {
      firebase.auth().getRedirectResult().then( result => {
        // This gives you a Google Access Token.
        // You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        console.log(token, user);
      }).catch(function(error) {        
        console.log(error.message);
      });
    });
  }
/*###*/
}
