import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products.component';
import { RouterModule, Routes } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { DeleteDirective } from 'src/app/directives/admin/delete.directive';
import { DeleteDialogComponent } from 'src/app/dialogs/delete-dialog/delete-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FileUploadModule } from 'src/app/services/common/file-upload/file-upload.module';
import { FileUploadDialogComponent } from '../../dialogs/file-upload-dialog/file-upload-dialog.component';
import { DialogModule } from 'src/app/dialogs/dialog.module';
import { UpdateDirective } from 'src/app/directives/admin/update.directive';

const routes: Routes = [
  {
    path: '',
    component: ProductsComponent
  }
]

@NgModule({
  declarations: [
    ProductsComponent,
    DeleteDirective,
    UpdateDirective
    
  ],
  imports: [
    CommonModule,
    NgxPaginationModule,
    MatDialogModule,
    DialogModule,
    FileUploadModule,
    RouterModule.forChild(routes)
  ],
  exports:[ProductsComponent]
})
export class ProductsModule { }
