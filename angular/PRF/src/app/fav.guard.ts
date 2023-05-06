import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavGuard implements CanActivate {
 constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const accessLevel: string | null = localStorage.getItem("accessLevel");
    if (localStorage.getItem("userEmail")) {
      return true;
    } else {
      this.router.navigate(['/']);
      return false;
    }
  }

}
