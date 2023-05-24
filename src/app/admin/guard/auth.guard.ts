import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from "@angular/core";
import { AuthService } from '../service/auth.service';

@Injectable()
export class authGuard implements CanActivate, CanActivateChild {

  constructor(
    private authService: AuthService,
    private router:Router

  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree>  | boolean | UrlTree {
    let result: boolean = this.authService.isAuthenticated();

    if (result) {
      return true;
    }
      return false;
  }
  canActivateChild(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
};
