import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TrainPageRoutingModule } from './train-routing.module';

import { TrainPage } from './train.page';
import { TocComponent } from './toc/toc.component';
import { OnepageComponent } from './onepage/onepage.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TrainPageRoutingModule
  ],
  declarations: [
    TrainPage,
    TocComponent,
    OnepageComponent
  ]
})
export class TrainPageModule {}
