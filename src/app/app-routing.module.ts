import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutsComponent } from './admin/layouts/layouts.component';
import { HomeComponent } from './admin/home/home.component';
import { LoginComponent } from './admin/layouts/login/login.component';
import { authGuard } from './admin/guard/auth.guard';

const routes: Routes = [
  {
    path: 'admin-login',
    component: LoginComponent,
    loadChildren: () => import('./admin/layouts/login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'admin',
    canActivate:[authGuard],
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
