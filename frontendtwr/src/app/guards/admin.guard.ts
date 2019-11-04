import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CanActivate } from '@angular/router';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  path: ActivatedRouteSnapshot[];
  route: ActivatedRouteSnapshot;
  constructor(private uservice: UserService, private router: Router) { }

  async canActivate(): Promise<boolean> {
    const role: string = await this.uservice.currentuserrole() as string;
    const re = /ADMIN/gi;
    console.log(role);
    if ( role.search(re) !== -1 ) {
      return true;
    } else {
      this.router.navigate(['/projects']);
      return false;
    }
  }
}
