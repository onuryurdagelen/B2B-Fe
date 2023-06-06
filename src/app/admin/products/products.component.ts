import { Component, OnDestroy, OnInit, Output, ViewChild, ViewChildren } from '@angular/core';
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
import { MatTableDataSource, _MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent extends BaseComponent implements OnInit, OnDestroy {

  constructor(spinner: NgxSpinnerService,
    private productService: ProductService,
    private alertify: AlertifyService,
    private dialogService: DialogService<ProductImageComponent>

  ) {
    super(spinner);

  }


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
  dtOptions: DataTables.Settings = {};
  totalProductCount: number;

  //table infos


 

  //Material Paginator

  length = 50;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25];

  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;

  pageEvent: PageEvent;


  //bootstrap pagination
  paginationArr: number[] = [];
  pagination: number = 1;
  pageSize: number = 5;
  currentPage: number = 1;

  async handlePageEvent($event) {
    console.log($event.target.innerHTML);
    this.pagination = parseInt($event.target.innerHTML);
    await this.getProducts();
  }
  async handlePreviousEvent()
  {
    this.pagination -= 1;
    await this.getProducts();
  }
  async handleNextEvent()
  {
    this.pagination += 1;
    await this.getProducts();
  }
  displayedColumns: string[] = ['name', 'stock', 'price', 'createdDate', 'updatedDate','delete','edit'];
  dataSource: MatTableDataSource<ListProductVM> = null;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  async ngOnInit(): Promise<void> {

    /* GET ALL PRODUCTS STARTS HERE*/
    this.showSpinner(SpinnerType.BallAtom);
    setTimeout(async () => { await this.getProducts(); }, 1000);
    
    let paginationCount: number = this.totalProductCount / this.pageSize;

    for (var i = 1; i <= paginationCount; i++) {
      this.paginationArr.push(i);
    }
    if (this.totalProductCount % this.pageSize) {
      this.paginationArr.push(this.paginationArr.length + 1);
    }
    console.log(this.paginationArr.length);
    /* GET ALL PRODUCTS ENDS HERE*/
  }

  ngOnDestroy(): void {
  }
  async pageChanged() {
    await this.getProducts();
  }
  async getProducts() {
    const result: ClientDataResponse<ProductVM> = await this.productService.read({ page: this.pagination - 1, size: this.pageSize },
      () => this.hideSpinner(SpinnerType.BallAtom),
      (errorMessage: string) => {
        this.hideSpinner(SpinnerType.BallAtom);
        this.alertify.show(errorMessage, {
          messageType: MessageType.ERROR,
          position: Position.TopRight
        })
      });
    this.products = result.data.products;
    this.totalProductCount = result.data.totalCount;
    //this.dataSource = new MatTableDataSource<ListProductVM>(result.data.products);
    //this.paginator.length = this.totalProductCount;

    
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
