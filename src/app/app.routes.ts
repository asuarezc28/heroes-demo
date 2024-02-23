import { Routes } from '@angular/router';
import { CreateEditHeroeComponent } from './pages/create-edit-heroe/create-edit-heroe.component';
import { HeroesComponent } from './pages/heroes/heroes.component';


export const routes: Routes = [
    { path: '', component: HeroesComponent, pathMatch: 'full' }, //
    { path: 'heroe', title: "Create or edit heroe", component: CreateEditHeroeComponent },
];