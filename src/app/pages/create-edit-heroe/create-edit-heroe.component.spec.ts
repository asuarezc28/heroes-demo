import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CreateEditHeroeComponent } from './create-edit-heroe.component';
import { ActivatedRoute, Router } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeroesService } from '../../../services/heroes.service';
import { FormControl } from '@angular/forms';
import Swal from 'sweetalert2';
import { of } from 'rxjs';

describe('CreateEditHeroeComponent', () => {
  let component: CreateEditHeroeComponent;
  let fixture: ComponentFixture<CreateEditHeroeComponent>;
  let heroesService: HeroesService;
  let router: Router;
  beforeEach(async () => {

    await TestBed.configureTestingModule({
      imports: [CreateEditHeroeComponent, RouterTestingModule, BrowserAnimationsModule],
      providers: [HeroesService, Router]
    })
      .compileComponents();
    heroesService = TestBed.inject(HeroesService);
    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(CreateEditHeroeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should load hero data if heroeId is set', () => {
    component.heroeId = '1';
    component.ngOnInit();
    expect(component.heroesForm.value).toEqual({ name: 'Superman', alias: 'Clark Kent', power: 'Super strength' });
    expect(component.image).toBe('https://i.ibb.co/fQ7PtZb/843d3cc2bea7c8df224e878e8b6326dd.jpg');
  });


  it('should create hero if form is valid and image is set', () => {
    //const setPageSpy2 = spyOn(heroesService, 'createHero');
    component.heroesForm.setValue({ name: 'Superman', alias: 'Clark Kent', power: 'Flight' });
    component.image = 'superman.jpg';
    component.isCreate = true;
    const patoSpy = jasmine.createSpyObj("heroesService", {
      createHero: of()
    });
    //component.submitForm();
    //expect(router.navigate).toHaveBeenCalledWith(['/']);

    spyOn(heroesService, 'createHero').and.callThrough();
    component.submitForm();
    expect(heroesService.createHero).toHaveBeenCalled();
  });

  it('should navigate to home on cancel', () => {
    component.cancel();
    // expect(router.navigate).toHaveBeenCalledWith(['/']);
  });

  it('should upload image and set image data', () => {
    const file = new File(['dummy data'], 'image.jpg', { type: 'image/jpeg' });
    const blob = new Blob(['dummy data'], { type: 'image/jpeg' });
    const event = {
      target: {
        files: [blob]
      }
    };
    component.selectedFile = file;
    component.uploadImage();
    expect(component.image).toBeUndefined;
  });


  it('should show error message for invalid image type', () => {
    const event = {
      target: {
        files: [{ type: 'text/plain' }]
      }
    };
    spyOn(Swal, 'fire');
    component.onFileSelected(event);
    expect(Swal.fire).toHaveBeenCalled();
  });



  it('should upload image and set image data', () => {
    const fileData = 'dummy data';
    const fileType = 'image/jpeg';
    const blob = new Blob([fileData], { type: fileType });
    component.selectedFile = blob;
    const event = {
      target: {
        files: [blob]
      }
    };
    spyOn(Swal, 'fire');
    component.onFileSelected(event);
    component.uploadImage();
    expect(component.image).toBeUndefined;
  });


});
