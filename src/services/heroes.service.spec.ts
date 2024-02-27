import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HeroesService } from './heroes.service';
import { Hero } from '../app/types/heroes';

describe('HeroesService', () => {
  let service: HeroesService;
  let httpTestingController: HttpTestingController;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HeroesService] 
    });
    service = TestBed.inject(HeroesService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve heroes from server', () => {
    const mockHeroes: Hero[] = [];
    service.getHeroesFromServer();
    const req = httpTestingController.expectOne('https://apimocha.com/heroesangular/heroes');
    expect(req.request.method).toBe('GET');
    req.flush(mockHeroes);
    expect(service.heroesList).toEqual(mockHeroes);
  });

  it('should retrieve heroes from local storage', () => {
    const mockHeroes: Hero[] = [];
    service.getHeroesFromLocalStorage();
    expect(service.heroesList).toEqual(mockHeroes);
  });

});
