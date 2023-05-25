import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeModule } from './home/home.module';
import { UiLayoutsModule } from './layouts/ui-layouts.module';
import { ProductListModule } from './product-list/product-list.module';
import { ProductDetailModule } from './product-detail/product-detail.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HomeModule,
    UiLayoutsModule,
    ProductListModule,
    ProductDetailModule
  ],
  exports: [
    HomeModule,
    UiLayoutsModule,
    ProductListModule,
    ProductDetailModule
  ]
})
export class UiModule { }
