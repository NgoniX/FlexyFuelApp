import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrderGasPage } from './order-gas.page';

const routes: Routes = [
  {
    path: '',
    component: OrderGasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderGasPageRoutingModule {}
