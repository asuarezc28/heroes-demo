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
    if (req.url.includes('apimocha.com/angularheroes/heroes')) {
      this.heroesService.setLoading(true);
      return next.handle(req).pipe(
        finalize(() => {
          this.heroesService.setLoading(false);
        })
      );
    }
    return next.handle(req);
  }
}
