import { Injectable } from '@angular/core';
import { HttpclientService } from './httpclient.service';
import { User } from 'src/app/contracts/users/user';
import { ClientResponse } from 'src/app/response/client-response';
import { Observable, firstValueFrom } from 'rxjs';
import { LoginUser } from 'src/app/contracts/login-user';
import { ClientDataResponse } from 'src/app/response/client-data-response';
import { Token } from 'src/app/contracts/token';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../ui/custom-toastr.service';
import { AlertifyService, MessageType, Position } from '../admin/alertify.service';
import { RefreshTokenLogin } from 'src/app/contracts/refresh-token';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private httpClientService:HttpclientService,
    private toastrService:CustomToastrService,
    private alertify: AlertifyService,
    ) { }

  async create(user:User):Promise<ClientResponse>{
    const createdUserObservable:Observable<ClientResponse> = await this.httpClientService.post<User,ClientResponse>({
      action:"Create",
      controller:"Users"
    },user);
    return await firstValueFrom(createdUserObservable) as ClientResponse;
  }

  async login(usernameOrEmail:string,password:string,
    callbackFunction?:() => void
    ):Promise<any | ClientDataResponse<Token>>{
    const observable:Observable<any | ClientDataResponse<Token>> = this.httpClientService.post<LoginUser,any | ClientDataResponse<Token>>({
      controller:"Users",
      action:"Login"
    },{
      password:password,
      usernameOrEmail:usernameOrEmail
    })
    const result:ClientDataResponse<Token> = await firstValueFrom(observable);
    if(result.data)
    {
    localStorage.setItem("accessToken",result.data.accessToken);
    localStorage.setItem("refreshToken",result.data.refreshToken);
    localStorage.setItem("token_expirationTime",result.data.expirationTime.toString());

      this.alertify.show(result.message,{
        messageType:MessageType.SUCCESS,
        position:Position.TopRight
      });
    }
    callbackFunction();
  }
  async refreshTokenLogin(refreshToken:string,callBackFunction?:() => void):Promise<any>
  {
    debugger;
    const observable:Observable<any | ClientDataResponse<Token>> = this.httpClientService.post<RefreshTokenLogin,any | ClientDataResponse<Token>>({
      controller:"Users",
      action:"RefreshTokenLogin"
    },{
      refreshToken:refreshToken
    })

    const result: ClientDataResponse<Token>  = await firstValueFrom(observable) as ClientDataResponse<Token>;
    
    if(result.data)
    {
      debugger;
    localStorage.setItem("accessToken",result.data.accessToken);
    localStorage.setItem("refreshToken",result.data.refreshToken);

    }
    callBackFunction();
  
  }
}
