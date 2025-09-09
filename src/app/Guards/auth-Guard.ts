import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, UrlTree } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean | UrlTree {
    const token = localStorage.getItem('authToken');
    const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : null;

    if (!token || !user) {
      return this.router.parseUrl('/auth');
    }

    const requiredRoles = route.data['roles'] as number[] | undefined;
    if (requiredRoles && !requiredRoles.includes(user.role_id)) {
      return this.router.parseUrl('/my-analysis');
    }

    return true;
  }
}
