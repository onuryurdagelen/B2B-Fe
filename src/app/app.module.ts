import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminModule } from './admin/admin.module';
import { authGuard } from './admin/guard/auth.guard';
import { AuthService } from './admin/service/auth.service';
import { UiModule } from './ui/ui.module';
import { RegisterModule } from './common/register/register.module';
import { LoginModule } from './common/login/login.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AdminModule,
    LoginModule,
    HttpClientModule,
    UiModule,
    RegisterModule,
    LoginModule
  ],
  providers: [AuthService,authGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
