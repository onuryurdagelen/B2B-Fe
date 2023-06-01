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
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSidenavModule } from '@angular/material/sidenav';
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
    MatSidenavModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatTableModule, MatPaginatorModule,
    DialogModule,
    FileUploadModule,
    RouterModule.forChild(routes)
  ],
  exports:[ProductsComponent]
})
export class ProductsModule { }
