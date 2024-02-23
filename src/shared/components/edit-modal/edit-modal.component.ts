import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { SharedModule } from '../../shared.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HeroesService } from '../../../services/heroes.service';

@Component({
  selector: 'app-edit-modal',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, ReactiveFormsModule, SharedModule, HttpClientModule],
  providers: [HeroesService, HttpClient],
  templateUrl: './edit-modal.component.html',
  styleUrl: './edit-modal.component.css'
})
export class EditModalComponent {
  @Output() heroSubmitted = new EventEmitter<any>();
  heroesForm: FormGroup;
  isCreate: boolean = false;
  constructor(public fb: FormBuilder,
    private dialogRef: MatDialogRef<EditModalComponent>,
    private heroesService: HeroesService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.heroesForm = this.fb.group({
      name: this.data?.name,
      alias: this.data?.alias,
      power: this.data?.power
    });
    this.loadData();
    this.isCreate = this.data?.isCreate;
  }

  loadData(): void {
    this.heroesService.heroes$.subscribe((res: any) => {
      console.log('BEHAAAAAAA', res);
    });
  }

  submitForm(): void {
    const heroe = {
      ...this.heroesForm.value,
      id: this.isCreate ? '' : this.data?.id
    };
    this.heroSubmitted.emit(heroe);
  }
}



