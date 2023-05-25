import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminModule } from './admin/admin.module';
import { authGuard } from './admin/guard/auth.guard';
import { AuthService } from './admin/service/auth.service';
import { UiLayoutsModule } from './ui/layouts/ui-layouts.module';
import { UiModule } from './ui/ui.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AdminModule,
    HttpClientModule,
    UiModule
  ],
  providers: [AuthService,authGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
