import { Injectable } from '@angular/core';
declare var alertify:any;
@Injectable({
  providedIn: 'root'
})
export class AlertifyService {

  constructor() { }

  show(message:string,options:Partial<AlertOptions>){
    alertify.set('notifier','position', options.position);
    alertify.set('notifier','delay', options.delay);
    alertify[options.messageType](message);
  }
  dismiss(){
    alertify.dismissAll();
  }
}

export class AlertOptions{
  messageType:MessageType = MessageType.MESSAGE;
  position:Position = Position.BottomRight;
  delay:number = 3

}

export enum MessageType {
  WARNING = "warning",
  SUCCESS = "success",
  ERROR = "error",
  MESSAGE = "message",
  NOTIFY = "notify"
}
export enum Position{
  TopCenter = "top-center",
  TopRight = "top-right",
  TopLeft = "top-left",
  BottomCenter = "bottom-center",
  BottomLeft = "bottom-left",
  BottomRight = "bottom-right"
}