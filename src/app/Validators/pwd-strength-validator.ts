import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms"

export function createPasswordStrengthValidator() : ValidatorFn {
  return (control:AbstractControl) : ValidationErrors | null => {
    const value = control.value;

    if (!value) { //si no hay errores retorna null
      return null;
    }
    const hasUpperCase = /[A-Z]+/.test(value); //is going to be evaluated to true
    const hasLowerCase = /[a-z]+/.test(value);
    const hasNumeric = /[0-9]+/.test(value);
    const passwordValid = hasUpperCase && hasLowerCase && hasNumeric;
    return !passwordValid ? {passwordStrength:true}:null;
  }
}
//build the return value of our validation function
//this validation function needs to return a series of errors if any error is found
//or null if the value is valid
//{passwordStrength:true} este es un objeto de error si el pwd no es valido
