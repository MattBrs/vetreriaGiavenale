import { Component, OnInit } from '@angular/core';
import {AuthService} from "../auth.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup = new FormGroup({
    'email': new FormControl(null, [Validators.required]),
    'password': new FormControl(null, [Validators.required]),
  });

  constructor(private authService: AuthService, private router: Router) { }

  onLogin() {
    let email = this.loginForm.controls.email.value;
    let password = this.loginForm.controls.password.value;
    this.authService.loginUser(email, password).subscribe(
      responsePayload => {
        this.router.navigate(['/home']);
      }, error => {
        alert(error);
      }
    );

  }

  ngOnInit(): void {
  }

}
