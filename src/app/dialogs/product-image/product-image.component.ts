import { Component, Inject, OnInit, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BaseDialog } from '../base/base-dialog';
import { FileUploadOptions } from 'src/app/services/common/file-upload/file-upload.component';
import { ProductService } from '../../services/common/product.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from '../../base/base.component';
import { ProductImageFileVM } from '../../contracts/productImage-file';
import { ClientDataResponse } from '../../response/client-data-response';
import { Res } from '@nestjs/common';
import { HttpclientService } from '../../services/common/httpclient.service';
import { ClientResponse } from '../../response/client-response';
import { AlertifyService, MessageType, Position } from '../../services/admin/alertify.service';

@Component({
  selector: 'app-product-image',
  templateUrl: './product-image.component.html',
  styleUrls: ['./product-image.component.scss']
})
export class ProductImageComponent extends BaseDialog<ProductImageComponent> implements OnInit{
  constructor(
    dialogRef: MatDialogRef<ProductImageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ProductImageDialogState | string,
    private productService: ProductService,
    private spinner: NgxSpinnerService,
    private httpClientService: HttpclientService,
    private alertify:AlertifyService

  ) {
    super(dialogRef);
  }
  productImages: ProductImageFileVM[];
  async ngOnInit(): Promise<void> {
    this.spinner.show(SpinnerType.BallAtom);
    const result: ClientDataResponse<ProductImageFileVM[]> = await this.productService.readProductFiles(this.data as string,
      () => {
        console.log("veriler başarıyla geldi.")
        this.spinner.hide(SpinnerType.BallAtom);
      }, (errorMessage: string) => {
        this.spinner.hide(SpinnerType.BallAtom);
        console.log(errorMessage);
    })
    this.productImages = result.data;
  }

  async deleteImageFile(imageId: string,event:any) {
    debugger;
    const result: ClientResponse = await this.productService.deleteImage(this.data as string, imageId, (successMessage: string) => {
      this.alertify.show(successMessage, {
        messageType: MessageType.SUCCESS,
        position: Position.TopRight
      });
      var card = $(event.srcElement).parent().parent();
      $(card).fadeOut(500);
    }, (errorMessage: string) => {
      this.alertify.show(errorMessage, {
        messageType: MessageType.ERROR,
        position: Position.TopRight
      });
    });
  }

  @Output() options:Partial<FileUploadOptions> = {
    accept: ".png, .jpg, .jpeg, .gif",
    controller: "Products",
    action: "UploadImageFile",
    explanation:"Select or drag product image file(s)...",
    isAdminPage:true,
    queryString: `id=${this.data}`,
  }
}


export enum ProductImageDialogState {
  Close
}
