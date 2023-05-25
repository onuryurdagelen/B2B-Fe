import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CustomToastrService } from '../ui/custom-toastr.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private jwtHelper:JwtHelperService,
    private toastrService:CustomToastrService,
    private spinner:NgxSpinnerService) { }

  identityCheck(){
    const token:string = localStorage.getItem("accessToken");
    // const decodedToken = this.jwtHelper.decodeToken(token);
    // const expirationDate = this.jwtHelper.getTokenExpirationDate(token);
    let expired:boolean;
    try {
      expired = this.jwtHelper.isTokenExpired(token);
    }catch{
      expired = true;
    }
    _isAuthenticated = token != null && !expired;
  }
  get isAuthenticated():boolean{
    return _isAuthenticated;
  }
}

export let _isAuthenticated:boolean;
