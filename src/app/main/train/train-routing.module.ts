import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TrainPage } from './train.page';

const routes: Routes = [
  {
    path: '',
    component: TrainPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrainPageRoutingModule {}
