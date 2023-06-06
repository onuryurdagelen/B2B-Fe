import { Inject, Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class HttpclientService {

  constructor(private httpClient:HttpClient,
    @Inject("baseUrl") private baseUrl:string) { }
  private generateUrl(requestParameter: Partial<RequestParameters>): string {
    return `${requestParameter.baseUrl ? requestParameter.baseUrl : this.baseUrl}/${requestParameter.controller}${requestParameter.action ? `/${requestParameter.action}` : ""}`;
  }

  get<TRequest, TResponse>(
    requestParameters: Partial<RequestParameters>,
    id?: string,
    queryParams?:Partial<TRequest>
  ): Observable<TResponse>
  {
    
    let url: string = "";
    if (requestParameters.remoteUrl)
      url = requestParameters.remoteUrl;
    else
      url = `${this.generateUrl(requestParameters)}${requestParameters.queryString ? `?${requestParameters.queryString}` : ""}`

    if(id)
      url =  `${this.generateUrl(requestParameters)}${id ? `/${id}` : ""}`
    return this.httpClient.get<TResponse>(url,{headers:requestParameters.headers});
  }
  post<TRequest,TResponse>(requestParameters:Partial<RequestParameters>,body:TRequest)
  :Observable<TResponse>
  {
    let url: string = "";
    if (requestParameters.remoteUrl)
      url = requestParameters.remoteUrl;
    else
      url = `${this.generateUrl(requestParameters)}${requestParameters.queryString ? `?${requestParameters.queryString}` : ""}`
    return this.httpClient.post<TResponse>(url, body, { headers: requestParameters.headers});
  }
  put<TRequest,TResponse>(requestParameters:Partial<RequestParameters>,body:Partial<TRequest>)
  :Observable<TResponse>
  {
    let url:string = "";
    if(requestParameters.remoteUrl)
    {
      url = requestParameters.remoteUrl;
    }
    else
      url = `${this.generateUrl(requestParameters)}`;

      return this.httpClient.put<TResponse>(url,body,{
        headers:requestParameters.headers
      });
  }
  delete<TRequest,TResponse>(requestParameters:Partial<RequestParameters>,id?:string):Observable<TResponse>
  {
    let url: string = "";
    if (requestParameters.remoteUrl)
      url = requestParameters.remoteUrl;
    else
      url = `${this.generateUrl(requestParameters)}${requestParameters.queryString ? `?${requestParameters.queryString}` : ""}`

    if (id)
      url = `${this.generateUrl(requestParameters)}${id ? `/${id}` : ""}`
      debugger;
    return this.httpClient.delete<TResponse>(url, { headers: requestParameters.headers });
  }
}

export class RequestParameters{
  controller?:string;
  action?:string;
  queryString?: string;
  id?:string;
  headers?:HttpHeaders;
  baseUrl?:string;
  remoteUrl?:string; 
  //kendi servisimizin dışındaki uzak servis url'lere istek atacağımız url'dir.
}
