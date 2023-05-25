import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { ListProductVM } from '../../contracts/list-product';
import { ProductPaginationVM } from '../../contracts/product-pagination-vm';
import { Product } from '../../contracts/create-product';
import { ClientResponse } from '../../response/client-response';
import { HttpclientService, RequestParameters } from './httpclient.service';
import { ClientDataResponse } from '../../response/client-data-response';
import { ProductVM } from '../../contracts/product-vm';
import { Observable, firstValueFrom } from 'rxjs';
import { ProductImageFileVM } from '../../contracts/productImage-file';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClientService: HttpclientService) { }

  create(product:Product,successCallBack?:() => void,errorCallBack?:(errorMessage:string) => void) {
    this.httpClientService.post<Product, ClientResponse>({
      controller: "Products/CreateProduct"
    }, product)
      .subscribe(result => {
        successCallBack();
      }, (errorResponse: HttpErrorResponse) => {
        const _error: Array<{ key: string, value: Array<string> }> = errorResponse.error;
        let message = "";
        _error.forEach((v, index) => {
          v.value.forEach((_v, _index) => {
            message += `${_v}<br>`;
          });
        });
        errorCallBack(message);
        //debugger;
      });
  }

  async read(pagination: Partial<ProductPaginationVM>, successCallBack?: () => void, errorCallBack?: (errorMessage: string) => void): Promise<ClientDataResponse<ProductVM>> {
    const promiseData: Promise<ClientDataResponse<ProductVM>> = this.httpClientService.get<ProductPaginationVM, ClientDataResponse<ProductVM>>({
    controller: "Products",
    queryString: `page=${pagination.page}&size=${pagination.size}`
    }).toPromise();

    promiseData.then(d => successCallBack())
      .catch((errorResponse: HttpErrorResponse) => errorCallBack(errorResponse.message))

    return await promiseData;
  }
  async delete(id:string):Promise<ClientResponse>{
    const deletedObservable:Observable<ClientResponse> = this.httpClientService.delete<any,ClientResponse>({
      controller:"Products/Delete"
    },id)

     return await firstValueFrom(deletedObservable);
  }
  async readProductFiles(id: string, successCallBack?: () => void, errorCallBack?: (errorMessage: string) => void):
   Promise<ClientDataResponse<ProductImageFileVM[]>>
  {
    const promiseData: Promise<ClientDataResponse<ProductImageFileVM[]>> = this.httpClientService.get<string,ClientDataResponse<ProductImageFileVM[]>>({
      action: "UploadedProductImageFiles",
     controller: "Products"
    }, id).toPromise();

    promiseData.then(d => successCallBack())
      .catch((errorResponse: HttpErrorResponse) => errorCallBack(errorResponse.message))

    return await promiseData;
  }

  async deleteImage(id: string, imageId: string, successCallback?: (successMessage:string) => void, errorCallback?: (errorMessage: string) => void): Promise<ClientResponse>
  {
    const promiseData: Promise<ClientResponse> = this.httpClientService.delete<any,ClientResponse>({
      action: "DeleteProductImageFile",
      controller: "Products",
      queryString: `id=${id}&imageId=${imageId}`
    }).toPromise();

    promiseData.then(d => successCallback(d.message))
      .catch((errorResponse: HttpErrorResponse) => errorCallback(errorResponse.message))

    return await promiseData;
  }
}
