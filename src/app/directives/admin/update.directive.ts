import { HttpErrorResponse } from '@angular/common/http';
import { Directive, ElementRef, EventEmitter, HostListener, Input, Output, Renderer2 } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { UpdateDialogComponent, UpdateState } from 'src/app/dialogs/update-dialog/update-dialog.component';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { DialogService } from 'src/app/services/common/dialog.service';
import { HttpclientService, RequestParameters } from 'src/app/services/common/httpclient.service';

@Directive({
  selector: '[appUpdate]'
})
export class UpdateDirective extends BaseComponent{

  constructor(
    private element: ElementRef,
    private _renderer:Renderer2,
    private httpClientService:HttpclientService,
    spinner: NgxSpinnerService,
    private matDialog: MatDialog,
    private alertifyService: AlertifyService,
    private dialogService: DialogService<UpdateDialogComponent>
    ) { 
    super(spinner)
    }
    @Input() id: string;
    @Input() updateParams: Partial<RequestParameters>;
    @Output() Callback: EventEmitter<any> = new EventEmitter();


  @HostListener('click')
  async onClick() {
    console.log("update directive running...");
    this.dialogService.openDialog({
      componentType: UpdateDialogComponent,
      data: UpdateState.Yes,
      afterClosed: () => {
        console.log("after closed running...");
        // this.showSpinner(SpinnerType.BallAtom);
        // const td: HTMLTableCellElement = this.element.nativeElement;
        // //console.log(this.id);
        // //await this.productService.delete(this.id);
        // this.httpClientService.delete(this.deleteParams, this.id).subscribe(data => {
        //   $(td.parentElement).animate({
        //     opacity: 0,
        //     left: "+=50",
        //     height: "toogle",
        //   }, 700, () => {
        //     this.Callback.emit();
        //     this.alertifyService.show("Product successfully deleted!", {
        //       messageType: MessageType.SUCCESS,
        //       position: Position.TopRight
        //     })
        //   });
        // }, (error: HttpErrorResponse) => {
        //   this.alertifyService.show("Something went wrong whilst deleting product!", {
        //     messageType: MessageType.ERROR,
        //     position: Position.TopRight
        //   })
        //   this.hideSpinner(SpinnerType.BallAtom);
        // });

      }
    })
    
  }
}
