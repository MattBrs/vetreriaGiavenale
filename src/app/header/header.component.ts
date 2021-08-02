import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from "../auth/auth.service";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  userLogged = false;
  userSub = new Subscription();

  constructor(private authService: AuthService, private router: Router) { }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/home']);
  }

  ngOnInit(): void {
    this.authService.loggedUser.subscribe(
      user => {
        this.userLogged = user.token != '';
      }
    );
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

}
