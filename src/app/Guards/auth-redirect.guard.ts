import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthServiceService } from '../Services/auth-service/auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthRedirectGuard implements CanActivate {
  constructor(private authService: AuthServiceService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isLoggedIn()) {
      const confirmLogout = confirm('You are already logged in. Do you want to logout?');
      if (confirmLogout) {
        this.authService.logout();
        return true;
      } else {
        this.router.navigate(['/my-analysis']);
        return false;
      }
    }
    return true;
  }
}
