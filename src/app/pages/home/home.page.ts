import { Platform } from '@ionic/angular';
import { FirestoreService } from './../../providers/firestore.service';
import { Component } from '@angular/core';
import { AuthService } from '../../providers/auth.service';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  userLevel: any;
  uid: any;
  subscribe: any;
  prices: any;

  constructor(public auth: AuthService,
    private firestoreService: FirestoreService,
    private platform: Platform,
    private router: Router) {

    // get prices
    this.firestoreService.getPrices().subscribe(data => {
      this.prices = data;
      console.log(this.prices);
    });

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        // get current logged user id value from firebase
        this.uid = user.uid;

        this.firestoreService.getUserID(this.uid).then(snapshot => {
          // get user level of current user from firestore
          const userLevel = snapshot.docs.map(doc => doc.data()['userLevel']).toString();

          localStorage.setItem('userLevel', JSON.stringify(userLevel));

          this.userLevel = JSON.parse(localStorage.getItem('userLevel'));

          console.log('User Level is storage: ' + JSON.parse(localStorage.getItem('userLevel')));

        });


        console.log('User ID ' + this.uid);
      }
    });

    // exit app using back button
    if (this.platform.is('android')) {
      this.platform.backButton.subscribeWithPriority(0, () => {
        console.log('this.router.url', this.router.url);
        if (this.router.url === '/home') {
          navigator['app'].exitApp();
        }
      });
    }

    // show local storage
    console.log('User Level in storage: ' + JSON.parse(localStorage.getItem('userLevel')));

  }

}
