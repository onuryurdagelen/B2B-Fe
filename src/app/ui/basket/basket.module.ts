import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiBasketComponent } from './basket.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: UiBasketComponent
  }
]

@NgModule({
  declarations: [
    UiBasketComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [UiBasketComponent]
})
export class BasketModule { }
