import { Component, Input, Output } from '@angular/core';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { HttpclientService } from '../httpclient.service';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { AlertifyService, MessageType, Position } from '../../admin/alertify.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../ui/custom-toastr.service';
import { FileUploadVM } from 'src/app/contracts/file-upload';
import { MatDialog } from '@angular/material/dialog';
import { FileUploadDialogComponent, FileUploadDialogState } from 'src/app/dialogs/file-upload-dialog/file-upload-dialog.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { DialogOptions, DialogService } from '../dialog.service';
import { DialogPosition } from '@angular/material/dialog';
import { ProductImageDialogState } from '../../../dialogs/product-image/product-image.component';
@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent extends BaseComponent {
  
  @Input() content:string = "Please choose a file";
  @Input() fileOptions: Partial<FileUploadOptions>;
  @Input() id: string;
  fileData:FormData;
  uploadedFiles:FileUploadVM[] = [];
  constructor(
    private httpClientService:HttpclientService,
    private alertifyService:AlertifyService,
    private toastrService:CustomToastrService,
    private matDialog:MatDialog,
    spinner: NgxSpinnerService,
    private dialogService:DialogService<FileUploadDialogComponent>
    ){
      super(spinner);
  }

  public files: NgxFileDropEntry[] = [];


  public selectedFiles(files: NgxFileDropEntry[]) {
    this.files = files;
    const fileData: FormData = new FormData();
    for (const file of files) {
      (file.fileEntry as FileSystemFileEntry).file((_file: File) => {
        fileData.append(_file.name, _file, file.relativePath);
      });
    }
    // this.openDialog(() => {
    //   this.uploadFiles();
    // });
    this.dialogService.openDialog({
      componentType:FileUploadDialogComponent,
      data:FileUploadDialogState.Yes,

      afterClosed: () => {
        this.showSpinner(SpinnerType.BallAtom);
        this.httpClientService.post<any, any>({
          controller: this.fileOptions.controller,
          action: this.fileOptions.action,
          queryString:this.fileOptions.queryString,
          headers: new HttpHeaders({ "responseType": "blob" })
        }, fileData).subscribe(data => {
          this.hideSpinner(SpinnerType.BallAtom);
          const message:string = "Files successfully uploaded!";
          if(this.fileOptions.isAdminPage){
            this.alertifyService.show(message,{
              messageType:MessageType.SUCCESS,
              position:Position.TopRight
            });
          }
          else{
            this.toastrService.message(message,"Upload File",{
              messageType:ToastrMessageType.SUCCESS,
              position:ToastrPosition.TOPRIGHT
            });
          }
        },(errorResponse:HttpErrorResponse) => {
          this.hideSpinner(SpinnerType.BallAtom);
          const message:string = "Something went wrong whilst uploading file!";
    
          if(this.fileOptions.isAdminPage){
            this.alertifyService.show(message,{
              messageType:MessageType.ERROR,
              position:Position.TopRight
            });
          }
          else{
            this.toastrService.message(message,"Uploade File",{
              messageType:ToastrMessageType.ERROR,
              position:ToastrPosition.TOPRIGHT
            });
        }
      });
      }
    })
  }
}



export class FileUploadOptions{
  controller?:string;
  action?:string;
  queryString?:string;
  explanation?: string;
  accept?:string;
  isAdminPage?:boolean = false;
}
