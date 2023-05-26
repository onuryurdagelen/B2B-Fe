import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeModule } from '../admin/home/home.module';
import { LayoutsModule } from './layouts/layouts.module';
import { ProductsModule } from './products/products.module';
import { CustomersModule } from './customers/customers.module';
import { OrdersModule } from './orders/orders.module';
import { RolesModule } from './roles/roles.module';
import { UsersModule } from './users/users.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HomeModule,
    ProductsModule,
    CustomersModule,
    OrdersModule,
    RolesModule,
    UsersModule,
    LayoutsModule
  ],
  exports:[
    HomeModule,
    ProductsModule,
    CustomersModule,
    OrdersModule,
    RolesModule,
    UsersModule,
    LayoutsModule
  ]
})
export class AdminModule { }
