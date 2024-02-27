import { HttpInterceptorFn } from '@angular/common/http';

export const authorInterceptorInterceptor: HttpInterceptorFn = (req, next) => {
  const clonedReq=req.clone({
    headers: req.headers.set(
      'authorId', `${500}`
      )
    })
    return next(clonedReq);
};
