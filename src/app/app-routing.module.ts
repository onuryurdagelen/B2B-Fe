import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutsComponent } from './admin/layouts/layouts.component';
import { UiLayoutsComponent } from './ui/layouts/ui-layouts.component';
import { HomeComponent } from './admin/home/home.component';
import { LoginComponent } from './common/login/login.component';
import { authGuard } from './admin/guard/auth.guard';
import { UiHomeComponent } from './ui/home/home.component';
import { UiBasketComponent } from './ui/basket/basket.component';
import { ProductListComponent } from './ui/product-list/product-list.component';
import { ProductDetailComponent } from './ui/product-detail/product-detail.component';
import { RegisterComponent } from './common/register/register.component';

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
    canActivateChild: [authGuard],
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
    canActivateChild:[authGuard],
    component:LayoutsComponent,
    children:[
      {
        path:'',
        component:HomeComponent,
        loadChildren:() => import('./admin/home/home.module').then(m => m.HomeModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
