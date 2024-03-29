import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HeroesService } from '../services/heroes.service';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { heroeInterceptor } from './interceptors/heroe.interceptor';

//export const appConfig: ApplicationConfig = {
//providers: [provideRouter(routes), provideAnimationsAsync(), provideHttpClient(withFetch(), withInterceptors([heroeInterceptor]))]
//};


export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), HeroesService, provideHttpClient(withInterceptors(
    [heroeInterceptor]
  )), provideAnimations(),],
};


