import { Directive } from "@angular/core";
import { AbstractControl, Validator,ValidationErrors, NG_VALIDATORS } from "@angular/forms";
import { createPasswordStrengthValidator} from '../Validators/pwd-strength-validator'


@Directive({
  selector: "[passwordStrength]",
  providers: [{provide: NG_VALIDATORS,
    useExisting: PasswordStrengthDirective,
    multi: true
  }]
  //with this provider the passwordstrengthdirective is going to be added to
  //the array of known formfield validators instead of replacing the whole array
  //with a single value, that's how to use the injection
})

export class PasswordStrengthDirective implements Validator {
//here we are implementing the validate method
  validate(control: AbstractControl): ValidationErrors | null { //this signature here
    //is very similar to the pwdstrength validator function
    //below we are creating the validation function on the fly and then we call the
    //validation function to get the validation result
      return createPasswordStrengthValidator()(control);
  }
}
//line 9 Validator is an interface from angular forms package
//and it needs to be integrated
