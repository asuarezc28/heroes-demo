import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimationsAsync()]
};



//export const appConfig: ApplicationConfig = {
//providers: [provideRouter(routes), CookieService, provideHttpClient(withInterceptors(
//[authInterceptor]
//)), provideAnimations(),],
//};

//export const authInterceptor: HttpInterceptorFn = (
//req: HttpRequest<any>,
//next: HttpHandlerFn
//): Observable<HttpEvent<any>> => {
//const cookieService = inject(CookieService);
//const token = cookieService.get('your-token');
//if (token) {
//const cloned = req.clone({
//setHeaders: {
//authorization: token,
//},
//});
//return next(cloned);
//} else {
//return next(req);
//}
//};
