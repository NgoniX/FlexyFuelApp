import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FlexyCardPageRoutingModule } from './flexy-card-routing.module';

import { FlexyCardPage } from './flexy-card.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    FlexyCardPageRoutingModule
  ],
  declarations: [FlexyCardPage]
})
export class FlexyCardPageModule { }
