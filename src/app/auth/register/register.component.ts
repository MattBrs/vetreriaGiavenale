import { Component, OnInit } from '@angular/core';
import {AuthService} from "../auth.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpErrorResponse} from "@angular/common/http";
import {throwError} from "rxjs";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {


  registrationForm: FormGroup = new FormGroup({
    'username': new FormControl(null, [Validators.required]),
    'email': new FormControl(null, [Validators.required]),
    'password': new FormControl(null, [Validators.required]),
    'city': new FormControl('schio', [Validators.required]),
  });
  constructor(private authService: AuthService) { }

  onRegister() {
    let username = this.registrationForm.controls.username.value;
    let userEmail = this.registrationForm.controls.email.value;
    let password = this.registrationForm.controls.password.value;
    let city = this.registrationForm.controls.city.value;

    this.authService.registerUser(userEmail, password, username).subscribe(
      responsePayload => {
        //Se va a buon fine
      }, error => {
        alert(error);
      }
    );

  }




  ngOnInit(): void {
  }

}
