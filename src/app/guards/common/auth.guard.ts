import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { SpinnerType } from 'src/app/base/base.component';
import { AuthService, _isAuthenticated } from 'src/app/services/common/auth.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from 'src/app/services/ui/custom-toastr.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

constructor(
  private jwtHelper:JwtHelperService,
  private router:Router,
  private toastrService:CustomToastrService,
  private spinner:NgxSpinnerService,
  private authService:AuthService
  ){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
      
      //token yok ise veya token süresi dolmuş ise
      if(!_isAuthenticated){
        //login
        //state => geldiğimiz yol
        //route => gideceğimiz yol
        this.router.navigate(["login"],{queryParams:{returnUrl:state.url}});
        this.toastrService.message("You must log in the system first.","Invalid access",{
          messageType:ToastrMessageType.WARNING,
          position:ToastrPosition.TOPRIGHT
        });
      }
      this.spinner.hide(SpinnerType.BallAtom);
      return true;
  }
  
}
