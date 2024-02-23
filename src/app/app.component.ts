import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../core/header/header.component';
import { SharedModule } from '../shared/shared.module';
import { HeroesComponent } from './pages/heroes/heroes.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, SharedModule, HeroesComponent, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'angular-tour-of-heroes';
}
