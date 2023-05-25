import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiHomeComponent } from './home.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: UiHomeComponent
  }
]

@NgModule({
  declarations: [
    UiHomeComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    UiHomeComponent
  ]
})
export class HomeModule { }
