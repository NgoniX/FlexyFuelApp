import { FirestoreService } from './../../providers/firestore.service';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoadingController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-add-sales',
  templateUrl: './add-sales.page.html',
  styleUrls: ['./add-sales.page.scss'],
})
export class AddSalesPage {

  public addSaleForm: FormGroup;
  isLoading = false;

  constructor(public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    formBuilder: FormBuilder,
    private firestoreService: FirestoreService) {

    this.addSaleForm = formBuilder.group({
      diesel: ['', Validators.required],
      petrol: ['', Validators.required],
      amount: ['', Validators.required],
      total: ['', Validators.required],
      client: ['', Validators.required],
      agent: ['', Validators.required],
      location: ['', Validators.required]
    });
  }

  // create an order
  createSale() {

    this.present();

      const diesel = this.addSaleForm.value.diesel;
      const petrol = this.addSaleForm.value.petrol;
      const amount = this.addSaleForm.value.amount;
      const total = this.addSaleForm.value.total;
      const client = this.addSaleForm.value.client;
      const agent = this.addSaleForm.value.agent;
      const location = this.addSaleForm.value.location;

    // get current date and time
    const today = new Date();
    const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    const time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
    const dateTime = date + ' ' + time;

    this.firestoreService.addSales(diesel,
      petrol, amount, total, client, agent, location, dateTime).then(() => {
        this.dismiss().then(() => {

          this.addSaleForm.reset();
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
      message: 'Sale Submitted Successfully',
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
    if (this.addSaleForm.valid) {
      return false;
    } else {
      return true;
    }
  }

}
