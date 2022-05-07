import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { map, Observable } from 'rxjs';
import { LoginService } from '../login/login.service';

@Injectable({
  providedIn: 'root',
})
export class UserGuard implements CanActivate {
  constructor(private loginService: LoginService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.loginService.getUserRole().pipe(
      map((role: any) => {
        if (role === 'user') {
          this.router.navigate(['home']);
          return true;
        } else {
          this.router.navigate(['admin']);
          return false;
        }
      })
    );
  }
}
