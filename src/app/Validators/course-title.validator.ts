//validator function that the return type of this function is going to be
//another function //async is the type

import { AbstractControl, AsyncValidatorFn } from "@angular/forms";
import { CoursesService } from "../services/courses.service";
import { map } from "rxjs/operators";
//this coursetitlevalidator is going to create the instance of asyncvalidatorfn
export function courseTitleValidator(courses: CoursesService):AsyncValidatorFn{
  return (control: AbstractControl) => {
    return courses.findAllCourses().pipe(
      map(courses => {
        const course = courses.find(
          course=>course.description.toLowerCase()
          ==control.value.toLowerCase());
          //we need to return an error object and if no course null
          return course ? {titleExists:true} : null
      })
    )
  }
}
//the return is the output of coursetitle validator
//because the validator is asyncronous we are going to be returning either a promise
//or an observable instead of plain value, in order to validate we need our
//courses services
