import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminModule } from './admin/admin.module';
import { AuthService } from './admin/service/auth.service';
import { UiModule } from './ui/ui.module';
import { RegisterModule } from './common/register/register.module';
import { LoginModule } from './common/login/login.module';
import { JwtModule } from '@auth0/angular-jwt';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttperrorhandlerinterceptorService } from './services/common/httperrorhandlerinterceptor.service';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';
import { DataTablesModule } from 'angular-datatables';
import { NgxPaginationModule } from 'ngx-pagination';

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
    BrowserAnimationsModule,
    NgxSpinnerModule.forRoot({type: 'ball-atom'}),
    DataTablesModule,
    NgxPaginationModule,
    ToastrModule.forRoot(),
    RegisterModule,
    LoginModule,
    JwtModule.forRoot({
      config:{
        tokenGetter:() => localStorage.getItem("accessToken"),
        allowedDomains: ["localhost:7107"] 
        //7107'ye gönderilen tüm isteklerde bu token'ı kullan demektir.
      }
    })
  ],
  providers: [
    AuthService,
    { provide: "baseUrl", useValue: "https://localhost:7107/api",multi:true},
    { provide: "baseUrlForFiles", useValue: "https://localhost:7107", multi: true },
    {provide: HTTP_INTERCEPTORS,useClass:HttperrorhandlerinterceptorService,multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
