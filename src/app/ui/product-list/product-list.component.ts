import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NgxSpinner, NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from '../../base/base.component';
import { ListProductVM } from '../../contracts/list-product';
import { ProductVM } from '../../contracts/product-vm';
import { ClientDataResponse } from '../../response/client-data-response';
import { AlertifyService, MessageType, Position } from '../../services/admin/alertify.service';
import { ProductService } from '../../services/common/product.service';
import { ActivatedRoute, Router, RouterModule, RouterStateSnapshot } from '@angular/router';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent extends BaseComponent implements OnInit{
  products: ListProductVM[];
  totalProductCount: number;
  constructor(
    spinner: NgxSpinnerService,
    private _Activatedroute: ActivatedRoute,
    private productService: ProductService,
    private alertify: AlertifyService,
    private router: Router,
    private activatedRoute:ActivatedRoute,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    super(spinner);
  }


  paginationArr: number[] = [];
  pagination: number = 1;
  pageSize: number = 5;
  currentPage: number;

  ngOnInit() {
    console.log("ngOnInit çalıştı.");

    /*Activated Route starts here */
    this.activatedRoute.params.subscribe(async params => {
      this.currentPage = parseInt(params["pageNo"] ?? 1);
      await this.getProducts(this.currentPage);
    });
    /*Activated Route ends here */


    /* GET ALL PRODUCTS STARTS HERE*/
    /* GET ALL PRODUCTS ENDS HERE*/
  }
  public rerender(): void {
    console.log("re-render çalıştı.")
    this.changeDetectorRef.detectChanges();
  }
  ngOnDestroy(): void {
  }
  async getProducts(pageNo:number = 1) {
    this.showSpinner(SpinnerType.BallAtom);
    const result: ClientDataResponse<ProductVM> = await this.productService.read({ page: pageNo - 1, size: this.pageSize },
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
    /* GET ALL PRODUCTS ENDS HERE*/

    this.paginationArr = [];
    let paginationCount: number = this.totalProductCount / this.pageSize;
    for (var i = 1; i <= paginationCount; i++) {
      this.paginationArr.push(i);
    }
    if (this.totalProductCount % this.pageSize) {
      this.paginationArr.push(this.paginationArr.length + 1);
    }

  }

  async handlePageEvent($event,item) {
    this.currentPage = parseInt($event.target.innerHTML);
    this.router.navigate(["product-list", this.currentPage]);
    this.checkItemVisible(item, this.currentPage);
    debugger;
    //await this.getProducts();
  }
  async handlePreviousEvent() {
    this.currentPage -= 1;
    this.router.navigate(["product-list", this.currentPage]);
    //await this.getProducts();
  }
  async handleNextEvent() {
    this.currentPage += 1;
    this.router.navigate(["product-list", this.currentPage]);
    //await this.getProducts();
  }

  checkItemVisible(item: number, currentPage: number): boolean {
    if (currentPage >= 5) {
      if ((item <= currentPage && item >= currentPage - 5) || (item >= currentPage && item <= currentPage + 5))
        return false;
      else
        return true;
    }
    else {
      if ((item <= currentPage && item >= currentPage - 5) || (item >= currentPage && item <= currentPage + 5))
        return false;
      else
        return true;
    }
    
  }

 
}
