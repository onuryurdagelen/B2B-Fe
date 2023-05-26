import { Component, OnDestroy, OnInit, Output, ViewChildren } from '@angular/core';
declare let $: any;

import { Subject } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { Product } from 'src/app/contracts/create-product';
import { ProductVM } from 'src/app/contracts/product-vm';
import { ClientDataResponse } from 'src/app/response/client-data-response';
import { ProductService } from '../../services/common/product.service';
import { DeleteDirective } from 'src/app/directives/admin/delete.directive';
import { RequestParameters } from '../../services/common/httpclient.service';
import { FileUploadOptions } from 'src/app/services/common/file-upload/file-upload.component';
import { DialogService } from '../../services/common/dialog.service';
import { ProductImageComponent, ProductImageDialogState } from '../../dialogs/product-image/product-image.component';
import { ListProductVM } from '../../contracts/list-product';
import { AlertifyService,MessageType,Position } from '../../services/admin/alertify.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent extends BaseComponent implements OnInit, OnDestroy {

  displayedProductColumns: string[] =
    ["Name",
      "Stock",
      "Price",
      "Created Date",
      "Updated Date",
      "Photos",
      "Actions"
    ];

  deleteParams: Partial<RequestParameters> = {
    controller: "Products/Delete"
  };
  @Output() fileOptions: Partial<FileUploadOptions> = {
    accept: ".jpg, .jpeg, .png ,.json",
    controller: "Products",
    action: "UploadImageFile",
    isAdminPage: true,
    explanation: "Drag products or choose products file..."
  };

  products: ListProductVM[];
  paginationCount: number[] = [];
  dtOptions: DataTables.Settings = {};
  totalProductCount: number;
  pagination: number;

  //table infos
  page: number = 1;
  count: number = 0;
  tableSize: number = 5;
  tableSizes: any = [5, 10, 15];


  constructor(spinner: NgxSpinnerService,
    private productService: ProductService,
    private alertify: AlertifyService,
    private dialogService: DialogService<ProductImageComponent>

  ) {
    super(spinner);

  }

  async getProducts() {
    const result: ClientDataResponse<ProductVM> = await this.productService.read({ page: this.page - 1, size: 5 }, () => this.hideSpinner(SpinnerType.BallAtom),
      (errorMessage: string) => {
        this.hideSpinner(SpinnerType.BallAtom);
        this.alertify.show(errorMessage, {
          messageType: MessageType.ERROR,
          position: Position.TopRight
        })
      });
    this.products = result.data.products;
    this.totalProductCount = this.products.length;
  }

  async ngOnInit(): Promise<void> {


    /* GET ALL PRODUCTS STARTS HERE*/
    this.showSpinner(SpinnerType.BallAtom);
    await this.getProducts();

    /* GET ALL PRODUCTS ENDS HERE*/
  }

  ngOnDestroy(): void {
  }

  create(txtName: HTMLInputElement, txtPrice: HTMLInputElement, txtStock: HTMLInputElement) {
    //this.productService.create()
    this.showSpinner(SpinnerType.BallAtom);
    const product: Product = new Product();
    product.name = txtName.value;
    product.price = (txtPrice.value != null && txtPrice.value.trim() != "") ? parseFloat(txtPrice.value) : 0;
    product.stock = (txtStock.value != null && txtStock.value.trim() != "") ? parseInt(txtStock.value) : 0;

    this.productService.create(product, () => {
      this.hideSpinner(SpinnerType.BallAtom);
      this.alertify.show("Product successfully added!", {
        messageType: MessageType.SUCCESS,
        position: Position.TopRight
      });
      this.getProducts();
    }, (message: string) => {
      this.alertify.show(message, {
        messageType: MessageType.ERROR,
        position: Position.TopRight
      })
    });
  }
  async onTableDataChange(event: any) {
    this.page = event;
    await this.getProducts();
  }
  async onTableSizeChange(event: any): Promise<void> {
    this.tableSize = event.target.value;
    this.page = 1;
    await this.getProducts();
  }

  async openProductFileDialog(id: string) {

    this.dialogService.openDialog({
      componentType: ProductImageComponent,
      data: id,
      params: {
        id: id
      },
      options: {
        width: '700px'
      }
    });
  }

}
