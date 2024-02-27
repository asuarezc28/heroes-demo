import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { HeroesService } from '../../services/heroes.service';

@Injectable()
export class HeroesLoadingInterceptor implements HttpInterceptor {
  constructor(private heroesService: HeroesService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    debugger;
    alert('');
    if (req.url.includes('https://apimocha.com/heroesangular/heroes')) {
      this.heroesService.setLoading(true);
      return next.handle(req).pipe(
        finalize(() => {
          setTimeout(() => {
            this.heroesService.setLoading(false);
          }, 3000);
        })
      );
    }
    return next.handle(req);
  }
}
