import {Component, OnInit} from '@angular/core';
import {FormBuilder,  Validators} from '@angular/forms';
import {CoursesService} from '../../services/courses.service';
import {Observable} from 'rxjs';
import {filter} from 'rxjs/operators';
import { courseTitleValidator } from '../../Validators/course-title.validator';

interface CourseCategory {
  code: string;
  description: string;
}
@Component({
  selector: 'create-course-step-1',
  templateUrl: './create-course-step-1.component.html',
  styleUrls: ['./create-course-step-1.component.scss']
})
export class CreateCourseStep1Component implements OnInit {

  form = this.fb.group({
    //refactoring validation for the course validator
    //title: ['', [Validators.required, Validators.minLength(5),
    //        Validators.maxLength(60)]]
    title:['', {
      validators: [Validators.required, Validators.minLength(5),
                Validators.maxLength(60)],
                asyncValidators: [courseTitleValidator(this.courses)],
             //   updateOn:'blur' //this is only for that call one time to backend
                //and not be calling each keyboard type

    }],
    releaseAt: [new Date(), Validators.required],
    category: ['BEGINNER', Validators.required],
    downloadsAllowed:[false],  //, Validators.requiredTrue
    longDescription: ['', [Validators.required, Validators.minLength(3)]]
   // address: [null, Validators.required]
  })

  courseCategories$ : Observable<CourseCategory[]>;

  constructor(private fb: FormBuilder, private courses: CoursesService) {

  }
  ngOnInit() {

    //this will return the list of categories from the backend and we are going to
    //apply it on the template
    this.courseCategories$ = this.courses.findCourseCategories();
    //following lines is to save the form in case user moves to another page
    const draft = localStorage.getItem("STEP_1");
    if (draft) {
      this.form.setValue(JSON.parse(draft));
    }
    this.form.valueChanges.pipe(
      filter(() => this.form.valid) //solo la forma esta en valid state lo guardo
    )
    .subscribe(val => localStorage.setItem("STEP_1", JSON.stringify(val)));
  }

  get courseTitle() {
    return this.form.controls['title'];
  }
}
