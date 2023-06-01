import { Component, OnInit } from '@angular/core';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from './services/common/auth.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from './services/ui/custom-toastr.service';
import { Router } from '@angular/router';
declare var $: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'e-commerce';
  constructor(public authService: AuthService,
    private toastrService: CustomToastrService,
    private router: Router) {

  }
  ngOnInit(): void {
    console.log("app girdi!")
    
    this.authService.identityCheck();
  }
  Logout() {
    localStorage.removeItem("accessToken");
    const expiration_time: string = localStorage.getItem("token_expirationTime");
    if (expiration_time)
      localStorage.removeItem("token_expirationTime");
    this.authService.identityCheck();
    this.router.navigate([""]);
    this.toastrService.message("You logged out from the system", "Log Out", {
      messageType: ToastrMessageType.INFO,
      position: ToastrPosition.TOPRIGHT
    });
  }
  /**
   *
   */


}
