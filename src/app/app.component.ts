import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../core/header/header.component';
import { SharedModule } from '../shared/shared.module';
import { HeroesComponent } from './pages/heroes/heroes.component';
import { HeroesService } from '../services/heroes.service';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { HeroesLoadingInterceptor } from './interceptors/heroes-loading.interceptor';
import { heroeInterceptor } from './interceptors/heroe.interceptor';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, SharedModule, HeroesComponent, RouterOutlet, HttpClientModule],
  providers: [HttpClient, HeroesService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'Heroes';
}
