import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddSalesPageRoutingModule } from './add-sales-routing.module';

import { AddSalesPage } from './add-sales.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    AddSalesPageRoutingModule
  ],
  declarations: [AddSalesPage]
})
export class AddSalesPageModule {}
