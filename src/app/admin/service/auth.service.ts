import { HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private httpClient: HttpClientModule,
    private router:Router
  ) { }

  isAuthenticated(): boolean {
    if (localStorage.getItem("admin-token")) {
      return false;
    }
    return true;
  }

}
