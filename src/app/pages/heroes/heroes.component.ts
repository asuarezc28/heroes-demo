import { Component } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { FormsModule, NgForm } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { HeroesService } from '../../../services/heroes.service';
import { HttpClient, HttpClientModule, HttpHandler } from '@angular/common/http';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { EditModalComponent } from '../../../shared/components/edit-modal/edit-modal.component';
import { ConfirmModalComponent } from '../../../shared/components/confirm-modal/confirm-modal.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-heroes',
  standalone: true,
  imports: [SharedModule, FormsModule, MatCardModule, HttpClientModule, MatDialogModule, EditModalComponent, MatPaginatorModule, MatProgressSpinnerModule, RouterOutlet],
  providers: [HeroesService, HttpClient],
  templateUrl: './heroes.component.html',
  styleUrl: './heroes.component.css'
})
export class HeroesComponent {
  heroes: any = [];
  originalHeroesList: any = [];
  searchTerm: string = '';
  filteredCards: any = [];
  isCreate: boolean = false;
  isLoading: boolean = true;

  constructor(private heroesService: HeroesService,
    private dialog: MatDialog,
    private router: Router) { }


  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.heroesService.getHeroesFromLocalStorage();
    this.heroesService.heroes$.subscribe((res: any) => {
      this.heroes = res;
      this.originalHeroesList = res;
    });
    this.heroesService.isLoading$.subscribe((res: any) => {
      this.isLoading = res;
    });
  }


  openDialog(isCreate: boolean, id?: any): void {
    if (isCreate) {
      this.router.navigate(['/heroe', { type: 'create' }]);
    } else {
      this.router.navigate(['/heroe', { type: 'edit', id: id }]);
    }
  }

  deleteHeroe(heroeId: any): void {
    const dialogRef = this.dialog.open(ConfirmModalComponent, {
    });
    dialogRef.componentInstance.confirmDelete.subscribe((confirmed: any) => {
      if (confirmed) {
        this.heroesService.deleteHero(heroeId);
      }
    }); dialogRef.componentInstance

  }


  search(searchTerm: any): void {
    const searchTermValue = searchTerm.target.value;
    const filteredHeroes = this.originalHeroesList.filter((hero: { name: string; alias: string; }) => {
      return hero.name.toLowerCase().includes(searchTermValue.toLowerCase()) || hero.alias.toLowerCase().includes(searchTermValue.toLowerCase());
    });
    this.heroes = filteredHeroes;
  }

}
