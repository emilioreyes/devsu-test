import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ProductsService } from '../Services/products.service';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(catchError((error)=>{
    if([400].includes(error.status) ){
      alert(error.error)
    }
    
    else if([401].includes(error.status)){
      console.log(error.error)
      alert(error.error)
    }else if([404].includes(error.status)){
      console.log(error.error);
      alert(error.error)
    }
    const e = error.error.message || error.statusText;
    console.error(e)  
    return throwError(()=>error)
  }));
};
