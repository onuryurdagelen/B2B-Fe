import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class CustomToastrService {

  constructor(private toastr:ToastrService) { }
  message(message:string,title:string,toastrOptions:Partial<ToastrOptions>){
    this.toastr[toastrOptions.messageType](message,title,{
      positionClass:toastrOptions.position
    });
  }
}
export class ToastrOptions{
  messageType:ToastrMessageType;
  position:ToastrPosition
}
export enum ToastrMessageType{
  SUCCESS = "success",
  ERROR = "error",
  INFO = "info",
  WARNING = "warning"
}
export enum ToastrPosition{
  TOPRIGHT = 'toast-top-right',
  TOPLEFT = 'toast-top-left',
  BOTTOMLEFT ='toast-bottom-left',
  BOTTOMRIGHT = 'toast-bottom-right',
  TOPCENTER = 'toast-top-center',
  BOTTOMCENTER = 'toast-bottom-center'
}
