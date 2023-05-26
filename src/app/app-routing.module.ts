import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutsComponent } from './admin/layouts/layouts.component';
import { UiLayoutsComponent } from './ui/layouts/ui-layouts.component';
import { HomeComponent } from './admin/home/home.component';
import { LoginComponent } from './common/login/login.component';
import { UiHomeComponent } from './ui/home/home.component';
import { UiBasketComponent } from './ui/basket/basket.component';
import { ProductListComponent } from './ui/product-list/product-list.component';
import { ProductDetailComponent } from './ui/product-detail/product-detail.component';
import { RegisterComponent } from './common/register/register.component';
import { ProductsComponent } from './admin/products/products.component';
import { CustomersComponent } from './admin/customers/customers.component';
import { OrdersComponent } from './admin/orders/orders.component';
import { UsersComponent } from './admin/users/users.component';
import { RolesComponent } from './admin/roles/roles.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    loadChildren: () => import('./common/login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'register',
    component: RegisterComponent,
    loadChildren: () => import('./common/register/register.module').then(m => m.RegisterModule)
  },
  {
    path: '',
    component: UiLayoutsComponent,
    children: [
      {
        path: '',
        component: UiHomeComponent,
        loadChildren:() => import('./ui/home/home.module').then(m => m.HomeModule)
      },
      {
        path: 'basket',
        component: UiBasketComponent,
        loadChildren: () => import('./ui/basket/basket.module').then(m => m.BasketModule)
      },
      {
        path: 'product-list',
        component: ProductListComponent,
        loadChildren:() => import('./ui/product-list/product-list.module').then(m => m.ProductListModule)
      },
      {
        path: 'product-detail',
        component: ProductDetailComponent,
        loadChildren: () => import('./ui/product-detail/product-detail.module').then(m => m.ProductDetailModule)
      }
    ]
  },
  {
    path: 'admin',
    component:LayoutsComponent,
    children:[
      {
        path:'',
        component:HomeComponent,
        loadChildren:() => import('./admin/home/home.module').then(m => m.HomeModule)
      },
      {
        path: 'products',
        component: ProductsComponent,
        loadChildren:() => import('./admin/products/products.module').then(m => m.ProductsModule)
      },
      {
        path: 'customers',
        component: CustomersComponent,
        loadChildren: () => import('./admin/customers/customers.module').then(m => m.CustomersModule)
      },
      {
        path: 'orders',
        component: OrdersComponent,
        loadChildren: () => import('./admin/orders/orders.module').then(m => m.OrdersModule)
      },
      {
        path: 'users',
        component: UsersComponent,
        loadChildren: () => import('./admin/users/users.module').then(m => m.UsersModule)
      },
      {
        path: 'roles',
        component: RolesComponent,
        loadChildren: () => import('./admin/roles/roles.module').then(m => m.RolesModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
