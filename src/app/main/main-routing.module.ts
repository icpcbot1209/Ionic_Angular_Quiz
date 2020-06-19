import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainPage } from './main.page';

const routes: Routes = [
  {
    path: '',
    component: MainPage,
    children: [
      {
        path: 'train',
        loadChildren: () => import('./train/train.module').then(m => m.TrainPageModule)
      },
      {
        path: 'test',
        loadChildren: () => import('./test/test.module').then(m => m.TestPageModule)
      },
      {
        path: 'intro',
        loadChildren: () => import('./intro/intro.module').then(m => m.IntroPageModule)
      },
      {
        path: '',
        redirectTo: 'intro',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: 'intro',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainPageRoutingModule {}
