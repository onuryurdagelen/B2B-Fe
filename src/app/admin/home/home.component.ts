import { Component, Inject, OnInit } from '@angular/core';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent } from '../../base/base.component';
import { HubUrls } from '../../constants/hub-urls';
import { ReceiveMethods } from '../../constants/receive-methods';
import { AlertifyService, MessageType, Position } from '../../services/admin/alertify.service';
import { SignalRService } from '../../services/common/signalr.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent  extends BaseComponent implements OnInit{
  constructor(
    spinner: NgxSpinnerService,
    @Inject("baseUrlForFiles") private baseUrl: string,
    private alertify:AlertifyService,
    private signalrService: SignalRService
  ) {
    super(spinner);
    //signalrService.start(HubUrls.ProductHub);
  }

  ngOnInit(): void {
    this.signalrService.on(HubUrls.ProductHub, ReceiveMethods.ReceiveProductAddedMessage, message => {
      this.alertify.show(message, {
        messageType: MessageType.NOTIFY,
        position: Position.BottomRight
      })
    });
    
  }
}
