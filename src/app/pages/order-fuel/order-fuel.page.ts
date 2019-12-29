import { FirestoreService } from './../../providers/firestore.service';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoadingController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-order-fuel',
  templateUrl: './order-fuel.page.html',
  styleUrls: ['./order-fuel.page.scss'],
})
export class OrderFuelPage {

  public addOrderForm: FormGroup;
  isLoading = false;

  constructor(public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    formBuilder: FormBuilder,
    private firestoreService: FirestoreService) {

    this.addOrderForm = formBuilder.group({
      phone: ['', Validators.required],
      fuelType: ['', Validators.required],
      litres: ['', Validators.required],
      location: ['', Validators.required],
      deliveryTime: ['', Validators.required],
      paymentMethod: ['', Validators.required],
    });
  }

  // create an order
  createOrder() {

    this.present();

    const phone = this.addOrderForm.value.phone;
    const fuelType = this.addOrderForm.value.fuelType;
    const litres = this.addOrderForm.value.litres;
    const location = this.addOrderForm.value.location;
    const deliveryTime = this.addOrderForm.value.deliveryTime;
    const paymentMethod = this.addOrderForm.value.paymentMethod;

    // get current date and time
    const today = new Date();
    const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    const time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
    const dateTime = date + ' ' + time;

    this.firestoreService.addOrder(phone,
      fuelType, litres, location, deliveryTime, paymentMethod, dateTime).then(() => {
        this.dismiss().then(() => {

          this.addOrderForm.reset();
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
      message: 'Thank you for your order. Our agents will contact you soon :)',
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
    if (this.addOrderForm.valid) {
      return false;
    } else {
      return true;
    }
  }

}
