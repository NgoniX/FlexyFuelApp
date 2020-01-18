import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../providers/auth.service';
import { FirestoreService } from './../../providers/firestore.service';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {

  userLevel: any;
  displayName: any;
  email: any;
  amountUSD: any;
  amountZWL: any;
  uid: any;

  constructor(public auth: AuthService, private firestoreService: FirestoreService) {

      firebase.auth().onAuthStateChanged(user => {
      if (user) {
        // get current logged user id value from firebase
        this.uid = user.uid;

        this.firestoreService.getUserID(this.uid).then(snapshot => {
          // get user level of current user from firestore
          this.userLevel = snapshot.docs.map(doc => doc.data()['userLevel']).toString();

          // get name of current user from firestore
          this.displayName = snapshot.docs.map(doc => doc.data()['displayName']).toString();

          // get amount USD of current user from firestore
          this.amountUSD = snapshot.docs.map(doc => doc.data()['amountUSD']).toString();

          // get amount ZWL of current user from firestore
          this.amountZWL = snapshot.docs.map(doc => doc.data()['amountZWL']).toString();

          console.log('User Level here: ' + this.userLevel);
          console.log('Name Level here: ' + this.displayName);
          console.log('Amount USD Level here: ' + this.amountUSD);
          console.log('Amount ZWL Level here: ' + this.amountZWL);

        });

      }
    });

  }

  ngOnInit() {
  }

}
