import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FlexyCardPage } from './flexy-card.page';

const routes: Routes = [
  {
    path: '',
    component: FlexyCardPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FlexyCardPageRoutingModule {}
