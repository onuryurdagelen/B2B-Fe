import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  isAuthenticated(): boolean {
    if (localStorage.getItem("admin-token")) {
      return true;
    }
    return false;
  }

}
