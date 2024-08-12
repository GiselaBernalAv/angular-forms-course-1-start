import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'onlyOneError'
  //no need to set the pure:true
  //the true pure property means that the pipe is only going to recompute
  //its output if its input changes but this is going to be an angular impure pipe
  //that its going to compute its output with each Angular change detection run
  //y por eso se pone implements pipetransoform
})
export class OnlyOneErrorPipe implements PipeTransform {
  //args son los argumentos que vienen del arreglo del ng container
  //transform(value:any, ...args): any {
    transform(allErrors:any, errorsPriority:string[]): any {
    if (!allErrors) {
      return null;
    }
    const onlyOneError: any = {};

    for (let error of errorsPriority) {
      if (allErrors[error]) {
        onlyOneError[error] = allErrors[error];
        break;
      }
    }

    return onlyOneError;
  }

}
