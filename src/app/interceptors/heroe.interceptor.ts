import { HttpInterceptorFn } from '@angular/common/http';

export const heroeInterceptor: HttpInterceptorFn = (req, next) => {
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
