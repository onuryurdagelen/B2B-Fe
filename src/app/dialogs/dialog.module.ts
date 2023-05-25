import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { FileUploadDialogComponent } from './file-upload-dialog/file-upload-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ProductImageComponent } from './product-image/product-image.component';
import { FileUploadComponent } from '../services/common/file-upload/file-upload.component';
import { FileUploadModule } from '../services/common/file-upload/file-upload.module';
import { MatCardModule } from '@angular/material/card';
import { UpdateDialogComponent } from './update-dialog/update-dialog.component';


@NgModule({
  declarations: [
    DeleteDialogComponent,
    ProductImageComponent,
    UpdateDialogComponent
  ],
  imports: [
    CommonModule,
    FileUploadModule,
    MatDialogModule,MatCardModule
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class DialogModule { }
