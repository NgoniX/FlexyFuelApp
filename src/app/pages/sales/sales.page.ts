import { FirestoreService } from './../../providers/firestore.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.page.html',
  styleUrls: ['./sales.page.scss'],
})
export class SalesPage implements OnInit {

  sales: any;
  tableStyle = 'material';

  constructor(public saleService: FirestoreService, private router: Router) { }

  ngOnInit() {
      this.saleService.getSales().subscribe(data => {
      this.sales = data;
      console.log(this.sales);
    });
  }

  addSale() {
      this.router.navigateByUrl('/add-sales');
  }

}
