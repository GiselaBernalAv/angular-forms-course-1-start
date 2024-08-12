import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import { createPromoRangeValidator } from '../../Validators/date-range.validators';



@Component({
  selector: 'create-course-step-2',
  templateUrl: 'create-course-step-2.component.html',
  styleUrls: ['create-course-step-2.component.scss']
})
export class CreateCourseStep2Component implements OnInit {
//al form le pasamos otro param de configuracion que es el validator del rango de fechas
  form = this.fb.group({
    courseType: ['premium', Validators.required],
    price: [null, [Validators.required, Validators.min(1), Validators.max(10000),
           Validators.pattern("[0-9]+") ]],
    thumbnail:[null],
    promoStartAt: [null],
    promoEndAt: [null]
  }, {
    validators: [createPromoRangeValidator()]
    //updateOn: 'blur' on blur is no good for uplaod
  });
  constructor(private fb: FormBuilder) {

  }

  ngOnInit() {
    //as long as the form has new values, this observable will be emited
    this.form.valueChanges.subscribe(
      val=>{
        const priceControl = this.form.controls["price"];
        if (val.courseType =='free' && priceControl.enabled) {
            priceControl.disable({emitEvent:false});
            //emitevent equals false es para que detenga el update
            //si no se detiene va a causar un loop y la pagina dejará de funcionar
            //this will prevent an infinite loop
        }
        else if (val.courseType =='premium' && priceControl.disabled) {
            priceControl.enable({emitEvent:false});
        }

      });
  }
}
