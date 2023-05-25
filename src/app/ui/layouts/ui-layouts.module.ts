import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiLayoutsComponent } from './ui-layouts.component';
import { RouterModule, Routes } from '@angular/router';
import { NavbarModule } from './navbar/navbar.module';
import { SidebarModule } from './sidebar/sidebar.module';
import { FooterModule } from './footer/footer.module';

const routes: Routes = [
  {
    path: '',
    component: UiLayoutsComponent
  }
]

@NgModule({
  declarations: [
    UiLayoutsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NavbarModule,
    SidebarModule,
    FooterModule
  ],
  exports: [
    UiLayoutsComponent
  ]
})
export class UiLayoutsModule { }
