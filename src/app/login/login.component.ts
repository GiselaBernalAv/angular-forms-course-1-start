import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  password:string;
val={
  email: "hola@example.com",
  password: ""
}
 // constructor() {}

  ngOnInit() {
  }

  login(loginForm: NgForm, submit) {
    console.log(loginForm.value, loginForm.valid, submit);
    console.log("val", this.val);
  }
  onEmailChange(change) {
    console.log(change);
  }
}
