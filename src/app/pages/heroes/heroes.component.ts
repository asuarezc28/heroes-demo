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
  searchTerm: string = '';
  filteredCards: any = [];
  isCreate: boolean = false;
  totalItems: number = 15;
  itemsPerPage = 5; // Items por página
  currentPage = 1; // Página actual
  isLoading: boolean = true;

  constructor(private heroesService: HeroesService,
    private dialog: MatDialog,
    private router: Router) { }


  ngOnInit(): void {
    // this.heroesService.getHeroes().subscribe(
    //(response: any) => {
    //this.heroes = response?.heroes;
    //console.log('res', response);
    //},
    //(error: any) => {
    //console.log('Error fetching products:', error);
    //}
    //);
    this.loadData();
  }

  loadData(): void {
    //this.heroesService.getHeroesFromServer();
    this.heroesService.getHeroesFromServer_();
    this.heroesService.heroes$.subscribe((res: any) => {
      console.log('BEHAAAAAAA', res);
      this.heroes = res;
      this.totalItems = res?.lenght;
    });
    this.heroesService.isLoading$.subscribe((res: any) => {
      this.isLoading = res;
    });
  }

  onSubmit(event: any): void {

  }

  navigateToDetailPage(card: any): void {

  }

  openDialog(isCreate: boolean, id?: any): void {
    if (isCreate) {
      this.router.navigate(['/heroe', { type: 'create' }])
    } else {
      this.router.navigate(['/heroe', { type: 'edit', id: id }]);
    }

    //    this.isCreate = isCreate;
    //let data: any = {};
    //if (isCreate) {
    //data.isCreate = true;
    //} else {
    //data = this.heroes.filter((heroe: any) => heroe.id === id);
    //}
    //console.log('d', data);
    //const dialogRef = this.dialog.open(EditModalComponent, {
    //data: data[0],
    ////maxWidth: '100vw',
    ////height: '100%',
    ////width: '100%',
    ////panelClass: 'full-screen-modal',
    //});

    //dialogRef.componentInstance.heroSubmitted.subscribe((heroe: any) => {
    //if (this.isCreate) {
    //this.heroesService.createHeroe(heroe);
    //} else {
    //this.heroesService.editHeroe(heroe);
    //}
    //}); dialogRef.componentInstance
  }

  deleteHeroe(heroeId: any): void {
    const dialogRef = this.dialog.open(ConfirmModalComponent, {
    });
    // this.heroesService.deleteHero(heroeId);
  }


  toggleFavorite(card: any, event: any): void {

  }

  search(value: any): void {
    this.heroesService.heroesFilter(value);
  }

  get cardsToShow() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.heroes.slice(startIndex, startIndex + this.itemsPerPage);
  }

  onPageChange(event: any) {
    this.currentPage = event.pageIndex + 1;
  }



}
