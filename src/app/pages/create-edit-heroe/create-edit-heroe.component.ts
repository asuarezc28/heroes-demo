import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { SharedModule } from '../../../shared/shared.module';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-create-edit-heroe',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, ReactiveFormsModule, SharedModule, HttpClientModule],
  templateUrl: './create-edit-heroe.component.html',
  styleUrl: './create-edit-heroe.component.css'
})

export class CreateEditHeroeComponent {
  heroesForm: FormGroup;

  constructor(private route: ActivatedRoute,
    public fb: FormBuilder) {
    this.heroesForm = this.fb.group({
      name: '',
      alias: '',
      power: ''
    });
  }


  ngOnInit(): void {
    //let name = this.route.snapshot.paraMap.get('name');
  }

  submitForm(): void {

  }

}
