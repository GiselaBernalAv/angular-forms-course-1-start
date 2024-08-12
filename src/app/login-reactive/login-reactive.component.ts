import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { createPasswordStrengthValidator } from '../Validators/pwd-strength-validator';

@Component({
  selector: 'login',
  templateUrl: './login-reactive.component.html',
  styleUrls: ['./login-reactive.component.css']
})
export class LoginReactiveComponent implements OnInit {
//con el de abajo ya no se requiere de la linea 12 a la 22
  // email= new FormControl('',
  // {
  //   validators: [Validators.required, Validators.email],
  //   updateOn: 'blur'
  // });
  // password= new FormControl('',
  // {
  //   validators: [Validators.required,
  //   Validators.minLength(8),
  //   createPasswordStrengthValidator()]
  // });

  //first way working before injecting it to constructor
  //form = new FormGroup({
   // email: new FormControl('', {validators: [Validators.required, Validators.email]}),
   // password: new FormControl('', {validators: [Validators.required, Validators.minLength(8)]})
 //  email: this.email,
 //  password: this.password
 // });
 //instrctor sugiere que siempre se declare asi de simplre sin form<any>
 form = this.fb.group({
  //para hacerlo nonnullable se pone el siguiente atributo this.fb...
  //pero...  esto ya no aplica cuando se inyecta en el contructor nonnullableformbuilder
    email:['', {
              validators: [Validators.required, Validators.email],
               updateOn: 'blur'}],
    password: ['', [Validators.required,
                    Validators.minLength(8),
                     createPasswordStrengthValidator()]
              ]
 });

  constructor(private fb: NonNullableFormBuilder ) { //FormBuilder
     // fb.control('', {}) no entendi porque dice que esto no se requiere aqui

  }

  ngOnInit() {

  }

  get email() {
    return this.form.controls['email'];
  }

  get password() {
    return this.form.controls['password'];
  }
  login() {
//    const formValue = this.form.value;

 //   this.form.patchValue({ this.email?, this.password?})
  }

  reset() {
    this.form.reset();
    console.log(this.form.value);
  }
}

//the default behavor of Reactive form is that they are null
