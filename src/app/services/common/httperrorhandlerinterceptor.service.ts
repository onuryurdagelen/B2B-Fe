import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { CustomHttpStatusCodes } from '../../constants/custom-http-errors';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../ui/custom-toastr.service';
import { AuthService } from './auth.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class HttperrorhandlerinterceptorService implements HttpInterceptor{

  constructor(private toastrService:CustomToastrService,private userService:UserService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(catchError(error => {
     
    switch(error.status){
      case HttpStatusCode.Unauthorized:
        this.toastrService.message("You are not authorized to perform this action.","Invalid authorized!",{
          position:ToastrPosition.TOPRIGHT,
          messageType:ToastrMessageType.WARNING
        });
        this.userService.refreshTokenLogin(localStorage.getItem("refreshToken"))
        .then(data => {

        });

        break;
      case HttpStatusCode.Forbidden:
        this.toastrService.message(error.error.Message, error.error.Title, {
          position: ToastrPosition.TOPRIGHT,
          messageType: ToastrMessageType.WARNING
        });
        break;
      case HttpStatusCode.InternalServerError:
        this.toastrService.message(error.error.Message,error.error.Title,{
          position:ToastrPosition.TOPRIGHT,
          messageType:ToastrMessageType.WARNING
        });
        break;
      case HttpStatusCode.BadRequest:
        this.toastrService.message(error.error.Message, error.error.Title,{
          position:ToastrPosition.TOPRIGHT,
          messageType:ToastrMessageType.WARNING
        });
        break;
      case HttpStatusCode.NotFound:
        this.toastrService.message(error.error.Message, error.error.Title,{
          position:ToastrPosition.TOPRIGHT,
          messageType:ToastrMessageType.WARNING
        });
        break;
      case CustomHttpStatusCodes.UserCreateFailed:
        this.toastrService.message(error.error.Message, error.error.Title, {
          position: ToastrPosition.TOPRIGHT,
          messageType: ToastrMessageType.WARNING
        });
        break;
      default:
        this.toastrService.message(error.error.Message, error.error.Title,{
          position:ToastrPosition.TOPRIGHT,
          messageType:ToastrMessageType.WARNING
        });
        break;
    }
      return of(error);
    }));
  }
}
