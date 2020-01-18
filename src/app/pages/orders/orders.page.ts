import { FirestoreService } from './../../providers/firestore.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
})
export class OrdersPage implements OnInit {

  orders: any;
  tableStyle = 'material';

  constructor(public orderService: FirestoreService) { }

  ngOnInit() {
    this.orderService.getOrders().subscribe(data => {
      this.orders = data;
      console.log(this.orders);
    });
  }

}
