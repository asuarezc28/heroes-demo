import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { SharedModule } from '../../../shared/shared.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { HeroesService } from '../../../services/heroes.service';
import { HeroesComponent } from '../heroes/heroes.component';

@Component({
  selector: 'app-create-edit-heroe',
  standalone: true,
  imports: [CommonModule, HeroesComponent, MatDialogModule, MatButtonModule, ReactiveFormsModule, SharedModule, HttpClientModule],
  providers: [HttpClient, HeroesService],
  templateUrl: './create-edit-heroe.component.html',
  styleUrl: './create-edit-heroe.component.css'
})

export class CreateEditHeroeComponent {
  heroesForm: FormGroup;
  title: string = '';
  image: SafeUrl = '';
  selectedFile: any = null;
  blobImg: any = null;
  heroeId: string | null;
  type: string | null;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private sanitizer: DomSanitizer,
    private heroesService: HeroesService,
    public fb: FormBuilder) {
    this.heroesForm = this.fb.group({
      name: '',
      alias: '',
      power: ''
    });
    this.type = this.route.snapshot.paramMap.get('type');
    this.type === 'create' ? this.title = 'Create' : this.title = 'Edit';
    this.heroeId = this.route.snapshot.paramMap.get('id');
  }


  ngOnInit(): void {
    this.heroesService.selectedHero$.subscribe(hero => {
      if (hero) {
        this.heroesForm.patchValue({
          name: hero.name,
          alias: hero.alias,
          power: hero.power
        });
      }
    });
  }

  submitForm(): void {
    let objectURL = URL.createObjectURL(this.blobImg);
    this.image = this.sanitizer.bypassSecurityTrustUrl(objectURL);
    const heroe = {
      ...this.heroesForm.value,
      id: this.heroeId ? this.heroeId : ''
    };
    if (this.type === 'create') {
      this.heroesService.createHero(heroe);
    } else {
      this.heroesService.editHero(heroe);
    }
    this.router.navigate(['/']);
  }

  cancel(): void {
    this.router.navigate(['/']);
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0] ?? null;
    const reader = new FileReader();
    reader.readAsArrayBuffer(this.selectedFile);
    reader.onload = () => {
      const blob = new Blob([reader.result as ArrayBuffer], { type: this.selectedFile.type });
      this.blobImg = blob;
    };
  }
}
