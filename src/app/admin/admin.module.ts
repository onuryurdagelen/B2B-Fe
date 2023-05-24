import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeModule } from '../admin/home/home.module';
import { LayoutsModule } from './layouts/layouts.module';
import { LoginModule } from './layouts/login/login.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HomeModule,
    LayoutsModule,
    LoginModule
  ],
  exports:[
    HomeModule,
    LayoutsModule,
    LoginModule
  ]
})
export class AdminModule { }
