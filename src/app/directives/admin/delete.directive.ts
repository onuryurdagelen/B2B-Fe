import { HttpErrorResponse } from '@angular/common/http';
import { Directive, HostListener, ElementRef, OnInit, Renderer2, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Delete, Res } from '@nestjs/common';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { HttpclientService, RequestParameters } from 'src/app/services/common/httpclient.service';
import { BaseDialog } from '../../dialogs/base/base-dialog';
import { DeleteDialogComponent, DeleteState } from '../../dialogs/delete-dialog/delete-dialog.component';
import { FileUploadDialogComponent } from '../../dialogs/file-upload-dialog/file-upload-dialog.component';
import { AlertifyService, MessageType, Position } from '../../services/admin/alertify.service';
import { DialogOptions, DialogService } from '../../services/common/dialog.service';
declare var $:any;
@Directive({
  selector: '[appDelete]'
})
export class DeleteDirective extends BaseComponent{
  
  constructor(
    private element: ElementRef,
    private _renderer:Renderer2,
    private httpClientService:HttpclientService,
    spinner: NgxSpinnerService,
    private matDialog: MatDialog,
    private alertifyService: AlertifyService,
    private dialogService: DialogService<DeleteDialogComponent>
    ) { 
    super(spinner)
    }
  @Input() id: string;
  @Input() deleteParams: Partial<RequestParameters>;
  @Output() Callback: EventEmitter<any> = new EventEmitter();

  @HostListener('click')
  async onClick() {
    console.log("delete directive running...");
    debugger;
    this.dialogService.openDialog({
      componentType: DeleteDialogComponent,
      data: DeleteState.Yes,
      afterClosed: () => {
        console.log("after closed running...");
        this.showSpinner(SpinnerType.BallAtom);
        const td: HTMLTableCellElement = this.element.nativeElement;
        //console.log(this.id);
        //await this.productService.delete(this.id);
        this.httpClientService.delete(this.deleteParams, this.id).subscribe(data => {
          $(td.parentElement).animate({
            opacity: 0,
            left: "+=50",
            height: "toogle",
          }, 700, () => {
            this.Callback.emit();
            this.alertifyService.show("Product successfully deleted!", {
              messageType: MessageType.SUCCESS,
              position: Position.TopRight
            })
          });
        }, (error: HttpErrorResponse) => {
          this.alertifyService.show("Something went wrong whilst deleting product!", {
            messageType: MessageType.ERROR,
            position: Position.TopRight
          })
          this.hideSpinner(SpinnerType.BallAtom);
        });

      }
    })
    
  }

}
