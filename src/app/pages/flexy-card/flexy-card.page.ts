import { FirestoreService } from './../../providers/firestore.service';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoadingController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-flexy-card',
  templateUrl: './flexy-card.page.html',
  styleUrls: ['./flexy-card.page.scss'],
})
export class FlexyCardPage {

  public addCardForm: FormGroup;
  isLoading = false;

  constructor(public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    formBuilder: FormBuilder,
    private firestoreService: FirestoreService) {

    this.addCardForm = formBuilder.group({
      name: ['', Validators.required],
      age: ['', Validators.required],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      employmentStatus: ['', Validators.required],
      fuelQuantities: ['', Validators.required],
    });
  }

  // create a Card
  createCard() {

    this.present();

    const name = this.addCardForm.value.name;
    const age = this.addCardForm.value.age;
    const phone = this.addCardForm.value.phone;
    const address = this.addCardForm.value.address;
    const employmentStatus = this.addCardForm.value.employmentStatus;
    const fuelQuantities = this.addCardForm.value.fuelQuantities;

    // get current date and time
    const today = new Date();
    const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    const time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
    const dateTime = date + ' ' + time;

    this.firestoreService.addCard(name,
      age, phone, address, employmentStatus, fuelQuantities, dateTime).then(() => {
        this.dismiss().then(() => {

          this.addCardForm.reset();
          this.presentAlert();
        });
      }, error => {
        this.dismiss();
        console.log(error);
      });

  }

  // show alert message
  async presentAlert() {

    const alert = await this.alertCtrl.create({
      header: 'Success',
      message: 'Thank you for your submission. We will inform you soon :)',
      buttons: ['OK']
    });
    return await alert.present();

  }


  // show loading icon
  async present() {
    this.isLoading = true;
    return await this.loadingCtrl.create({
      duration: 9000,
    }).then(a => {
      a.present().then(() => {
        console.log('presented');
        if (!this.isLoading) {
          a.dismiss().then(() => console.log('abort presenting'));
        }
      });
    });
  }

  // dismiss loading icon
  async dismiss() {
    this.isLoading = false;
    return await this.loadingCtrl.dismiss().then(() => console.log('dismissed'));
  }

  checkValid() {
    if (this.addCardForm.valid) {
      return false;
    } else {
      return true;
    }
  }

}
