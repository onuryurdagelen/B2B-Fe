import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductDetailComponent } from './product-detail.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: "",
    component:ProductDetailComponent
  }
]

@NgModule({
  declarations: [
    ProductDetailComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    ProductDetailComponent
  ]
})
export class ProductDetailModule { }
