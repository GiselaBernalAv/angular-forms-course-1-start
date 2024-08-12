import { of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { HttpClient, HttpEventType } from '@angular/common/http';
import {Component, Input} from '@angular/core';
import { AbstractControl, ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS,
  Validator, ValidationErrors } from '@angular/forms';


@Component({
  selector: 'file-upload',
  templateUrl: "file-upload.component.html",
  styleUrls: ["file-upload.component.scss"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi:true,
      useExisting: FileUploadComponent
    },
    {
      provide: NG_VALIDATORS,
      multi:true,
      useExisting: FileUploadComponent
    }
  ]
})
//validator interface will act after once the image is uploaded and will change
//the form to true or valid
export class FileUploadComponent implements ControlValueAccessor,Validator {

@Input()
requiredFileType:string;

fileName='';

fileUploadError = false;

fileUploadSuccess=false;

uploadProgress:number;

disabled: boolean = false;

onChange =(fileName:string) => {};

onTouched = () => {};

onValidatorChange=() =>{};

constructor(private http: HttpClient) {
}

onClick(fileUpload: HTMLInputElement){
  this.onTouched();
  fileUpload.click();
}
onFileSelected(event) {
  const file:File = event.target.files[0];
  if (file) {
    this.fileName=file.name;
    console.log(this.fileName);
    const formData = new FormData();
    formData.append("thumbnail", file);
    this.fileUploadError = false;
    this.http.post("http://localhost:9000/api/thumbnail-upload", formData, {
      reportProgress:true, observe:'events'
    })
      .pipe(
        //catcherror es un operator and triggers a function
        catchError(error => {
          this.fileUploadError = true;
          return of(error)
           //return a new observable
          //that emits only one error
        }),
        finalize(() => {
          this.uploadProgress = null;
        })
      )
      .subscribe(event => {
        if (event.type == HttpEventType.UploadProgress){
          this.uploadProgress = Math.round(100* (event.loaded / event.total));
        }
        else if(event.type == HttpEventType.Response) {
          this.fileUploadSuccess = true;
          this.onChange(this.fileName);
          this.onValidatorChange();
        }
      });
  }}

  writeValue(value: any): void {
      this.fileName = value;
  }

  //the way that the child control can communicate with the parent form
  //is by a call back
  //with following function we will get a call back
  registerOnChange(onChange: any) {
      this.onChange= onChange;
  }

  registerOnTouched(onTouched: any) {
      this.onTouched = onTouched;
  }

  setDisabledState(disabled: boolean) {
      this.disabled= disabled;
  }

  registerOnValidatorChange(onValidatorChange: () => void) {
    this.onValidatorChange =onValidatorChange
  }

  //we have to return either null or vlaidation error
  validate(control: AbstractControl): ValidationErrors | null {
    if (this.fileUploadSuccess) {
      return null;
    }
    let errors: any= {
      requiredFileType: this.requiredFileType
    }
    if (this.fileUploadError) {
      errors.uploadFailed = true;
    }
    return errors;
  }
}
