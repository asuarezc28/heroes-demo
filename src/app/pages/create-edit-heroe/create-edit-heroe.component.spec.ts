import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditHeroeComponent } from './create-edit-heroe.component';

describe('CreateEditHeroeComponent', () => {
  let component: CreateEditHeroeComponent;
  let fixture: ComponentFixture<CreateEditHeroeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateEditHeroeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateEditHeroeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
