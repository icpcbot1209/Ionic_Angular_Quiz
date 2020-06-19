import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TestPageRoutingModule } from './test-routing.module';
import { MyMaterialModule } from '../../material-module';

import { TestPage } from './test.page';
import { ReadyComponent } from './ready/ready.component';
import { TestingComponent } from './testing/testing.component';
import { PassedComponent } from './passed/passed.component';
import { FailedComponent } from './failed/failed.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TestPageRoutingModule,
    MyMaterialModule
  ],
  declarations: [
    TestPage,
    ReadyComponent,
    TestingComponent,
    PassedComponent,
    FailedComponent
  ]
})
export class TestPageModule {}
