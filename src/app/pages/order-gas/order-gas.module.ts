import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrderGasPageRoutingModule } from './order-gas-routing.module';

import { OrderGasPage } from './order-gas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    OrderGasPageRoutingModule
  ],
  declarations: [OrderGasPage]
})
export class OrderGasPageModule { }
