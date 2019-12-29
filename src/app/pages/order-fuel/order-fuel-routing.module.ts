import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrderFuelPage } from './order-fuel.page';

const routes: Routes = [
  {
    path: '',
    component: OrderFuelPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderFuelPageRoutingModule {}
