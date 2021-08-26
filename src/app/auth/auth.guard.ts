import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from "./auth.service";
import {take} from "rxjs/operators";
import {User} from "../shared/user.model";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let tmpUser: User = new User('', '', '', new Date());
    this.authService.loggedUser.pipe(take(2)).subscribe(user => {
      if(user.token == ''){
        tmpUser = !!this.authService.autoLogin() ?
          <User>this.authService.autoLogin() : new User('', '', '', new Date());
        console.log('Logging in')
      }else{
        tmpUser = user;
        console.log('User found')
      }
    });

    if(tmpUser.token == ''){
      return this.router.createUrlTree(['/auth/login']);
    }else{
      return true;
    }
  }
}
