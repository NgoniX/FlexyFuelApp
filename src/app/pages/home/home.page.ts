import { FirestoreService } from './../../providers/firestore.service';
import { Component } from '@angular/core';
import { AuthService } from '../../providers/auth.service';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  userLevel: any;
  uid: any;

  constructor(public auth: AuthService, private firestoreService: FirestoreService) {

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        // get current logged user id value from firebase
        this.uid = user.uid;

        this.firestoreService.getUserID(this.uid).then(snapshot => {
          // get user level of current user from firestore
          this.userLevel = snapshot.docs.map(doc => doc.data()['userLevel']).toString();
          console.log('User Level is: ' + this.userLevel);

        });


        console.log('User ID ' + this.uid);
      }
    });

  }

}
