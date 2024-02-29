import { HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { HeroesService } from '../../services/heroes.service';

export const heroeInterceptor: HttpInterceptorFn = (req, next) => {
  alert('eeeeee');
  if (req.url.includes('https://apimocha.com/heroesangular/heroes')) {
    //   this.heroesService.setLoading(true);
    //return next.handle(req).pipe(
    //finalize(() => {
    //setTimeout(() => {
    //this.heroesService.setLoading(false);
    //}, 3000);
    //})
    //);
  }
  return next(req);
};



export const heroeInterceptor__: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
): Observable<HttpEvent<any>> => {
  debugger;
  const heroesService = inject(HeroesService);
  console.log('req', req);
  alert('');
  return next(req);
}


export const heroeInterceptor_: HttpInterceptorFn = (req, next) =>
  next(req).pipe(catchError(handleErrorResponse))



function handleErrorResponse(error: HttpErrorResponse) {
  alert('');
  console.log('my error', error);
  const errorResponse = `Error`
  return throwError(() => 'Error');
}

