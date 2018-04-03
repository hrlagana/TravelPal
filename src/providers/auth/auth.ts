import { Injectable } from '@angular/core';
import firebase from 'firebase';



@Injectable()

export class AuthProvider {

  constructor() { }

  loginUser(email: string, password: string): Promise<any> {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }

  signupUser(firstName: string, lastName: string, email: string, password: string, gender: string, DOB: string): Promise<any> {
    return firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(newUser => {
        firebase
          .database()
          .ref(`/userProfile/${newUser.uid}/firstName`)
          .set(firstName);
        firebase
          .database()
          .ref(`/userProfile/${newUser.uid}/lastName`)
          .set(lastName);
        firebase
          .database()
          .ref(`/userProfile/${newUser.uid}/email`)
          .set(email);
        firebase
          .database()
          .ref(`/userProfile/${newUser.uid}/gender`)
          .set(gender);
        firebase
          .database()
          .ref(`/userProfile/${newUser.uid}/DOB`)
          .set(DOB);
      })
      .catch(error => {
        console.error(error);
        throw new Error(error);
      });
  }

  resetPassword(email: string): Promise<void> {
    return firebase.auth().sendPasswordResetEmail(email);
  }

  logoutUser(): Promise<void> {
    const userId: string = firebase.auth().currentUser.uid;
    firebase
      .database()
      .ref(`/userProfile/${userId}`)
      .off();
    return firebase.auth().signOut();
  }

}
