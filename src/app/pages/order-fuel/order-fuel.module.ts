import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrderFuelPageRoutingModule } from './order-fuel-routing.module';

import { OrderFuelPage } from './order-fuel.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    OrderFuelPageRoutingModule
  ],
  declarations: [OrderFuelPage]
})
export class OrderFuelPageModule { }
