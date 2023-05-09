import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from 'src/app/frontOffice/user/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(/*private router: Router*/) { }
  role= sessionStorage.getItem('role') ; 

  canActivate(): boolean {
    
    if (this.role==="Admin") {
      return true;
    } else {
      //this.router.navigate(['/']);
      return false;
    }
  }
}