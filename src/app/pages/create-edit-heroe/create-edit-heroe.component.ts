import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedModule } from '../../../shared/shared.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { HeroesService } from '../../../services/heroes.service';

@Component({
  selector: 'app-create-edit-heroe',
  standalone: true,
  imports: [CommonModule, MatButtonModule, ReactiveFormsModule, SharedModule, HttpClientModule],
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
  isCreate: boolean = false;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private heroesService: HeroesService,
    public fb: FormBuilder) {
    this.heroesForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(20), Validators.pattern('^[a-zA-Z ]*$')]],
      alias: ['', [Validators.required, Validators.maxLength(20), Validators.pattern('^[a-zA-Z ]*$')]],
      power: ['', [Validators.required, Validators.maxLength(20), Validators.pattern('^[a-zA-Z ]*$')]],
    });
    const type = this.route.snapshot.paramMap.get('type');
    this.isCreate = type === 'create';
    this.isCreate ? this.title = 'Create' : this.title = 'Edit';
    this.heroeId = this.route.snapshot.paramMap.get('id');

  }

  ngOnInit(): void {
    this.heroesService.getHeroesFromLocalStorage();
    if (this.heroeId) {
      const hero = this.heroesService.findHeroById(this.heroeId);
      console.log('hero', hero);
      this.heroesForm.patchValue({
        name: hero?.name,
        alias: hero?.alias,
        power: hero?.power,
      });
      this.image = hero?.image;
    }
  }

  imageValidator() {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const file = control.value;
      debugger;
      if (!file) {
        return { 'required': true }; // Devuelve un error si no se ha seleccionado una imagen
      }
      return null; // Retorna nulo si la validación pasa
    };
  }


  submitForm(): void {
    if (this.heroesForm.valid && this.image) {
      const heroe = {
        ...this.heroesForm.value,
        id: this.heroeId ? this.heroeId : '',
        image: this.image
      };
      if (this.isCreate) {
        this.heroesService.createHero(heroe);
      } else {
        this.heroesService.editHero(heroe);
      }
      //this.router.navigate(['/']);
    } else {
      console.log('Por favor completa correctamente todos los campos del formulario.');
    }
  }


  cancel(): void {
    this.router.navigate(['/']);
  }

  onFileSelected_(event: any): void {
    this.selectedFile = event.target.files[0] ?? null;
    const reader = new FileReader();
    reader.readAsArrayBuffer(this.selectedFile);
    reader.onload = () => {
      const blob = new Blob([reader.result as ArrayBuffer], { type: this.selectedFile.type });
      this.blobImg = blob;
    };
  }


  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const fileType = file.type;
      if (fileType === 'image/jpeg' || fileType === 'image/png') {
        this.selectedFile = file;
        this.uploadImage();
      } else {
        console.log('Por favor selecciona un archivo JPEG o PNG válido.');
      }
    }
  }

  uploadImage() {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.image = e.target.result;
    };
    reader.readAsDataURL(this.selectedFile);
  }



}
