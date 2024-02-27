import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Hero } from '../app/types/heroes';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private heroes = new BehaviorSubject<Hero[]>([]);
  heroes$ = this.heroes.asObservable();
  private isLoading = new BehaviorSubject<boolean>(true);
  isLoading$ = this.isLoading.asObservable();
  heroesList: Hero[] = [];
  constructor(private http: HttpClient) {

  }

  her =
    [
      {
        "id": '1',
        "name": "Superman",
        "alias": "Clark Kent",
        "power": "Super strength",
        "image": "https://i.ibb.co/fQ7PtZb/843d3cc2bea7c8df224e878e8b6326dd.jpg"
      },
      {
        "id": '2',
        "name": "Wonder Woman",
        "alias": "Diana Prince",
        "power": "Superhuman strength",
        "image": "https://i.ibb.co/BP4XNXV/5534efecdb37c4674334477527c3c67d.jpg"
      },
      {
        "id": '3',
        "name": "Spider-Man",
        "alias": "Peter Parker",
        "power": "Wall-crawling",
        "image": "https://i.ibb.co/vwqb8nk/019a76446d1d41672e83c32d11ffb705.jpg"
      },
      {
        "id": '4',
        "name": "Batman",
        "alias": "Bruce Wayne",
        "power": "Genius intellect",
        "image": "https://i.ibb.co/y6kxdSb/a91c05fd69e22b4ee8e87859e1368137.jpg"
      },
      {
        "id": '5',
        "name": "Iron Man",
        "alias": "Tony Stark",
        "power": "Powered armor suit",
        "image": "https://i.ibb.co/NKWCfBk/a8716f8f85b1ac5963700d971462c70a.jpg"
      },
      {
        "id": '6',
        "name": "Captain America",
        "alias": "Steve Rogers",
        "power": "Peak human strength",
        "image": "https://i.ibb.co/dQ8W7y4/1941cf28de7db3deeec7d4c6ca935649.jpg"
      },
      {
        "id": '7',
        "name": "Thor",
        "alias": "Thor Odinson",
        "power": "God of Thunder",
        "image": "https://i.ibb.co/42CrPjg/2298.jpg"
      }
    ]



  getHeroesFromServer(): void {
    https://apimocha.com/angularheroes/heroe
    this.http.get<any>('https://apimocha.com/heroesangular/heroes').subscribe(resp => {
      let storedHeroesList = localStorage.getItem('heroesList');
      if (storedHeroesList && storedHeroesList !== 'undefined') {
        this.heroesList = JSON.parse(storedHeroesList);
      } else {
        this.heroesList = resp;
      }
      this.updateHeroesList(this.heroesList);
    });
  }

  getHeroesFromLocalStorage(): void {
    let storedHeroesList = localStorage.getItem('heroesList');
    if (storedHeroesList && storedHeroesList !== 'undefined') {
      this.heroesList = JSON.parse(storedHeroesList);
    }
    const listToUpdate = this.heroesList.length > 0 ? this.heroesList : this.her;
    this.updateHeroesList(listToUpdate);
  }


  private updateHeroesList(heroes: Hero[]): void {
    this.heroes.next(heroes);
    localStorage.setItem('heroesList', JSON.stringify(heroes));
  }

  setLoading(isLoading: boolean) {
    this.isLoading.next(isLoading);
  }

  editHero(heroeToModify: Hero) {
    this.heroesList = this.getStoredHeroesList();
    const updatedHeroes = this.heroesList.map(hero => hero.id === heroeToModify.id ? heroeToModify : hero);
    this.updateAndStoreHeroes(updatedHeroes);
  }

  deleteHero(heroId: string | undefined) {
    this.heroesList = this.getStoredHeroesList();
    const updatedHeroes = this.heroesList.filter(hero => hero.id !== heroId);
    this.updateAndStoreHeroes(updatedHeroes);
  }

  createHero(newHeroe: Hero) {
    this.heroesList = this.getStoredHeroesList();
    const newHeroeWithId = { ...newHeroe, id: (this.heroesList.length + 1).toString() };
    const updatedHeroes = [...this.heroesList, newHeroeWithId];
    this.updateAndStoreHeroes(updatedHeroes);
  }

  private getStoredHeroesList(): Hero[] {
    const storedHeroesList = localStorage.getItem('heroesList');
    return storedHeroesList ? JSON.parse(storedHeroesList) : [];
  }

  private updateAndStoreHeroes(heroes: Hero[]): void {
    this.heroesList = heroes;
    this.updateHeroesList(heroes);
  }


  findHeroById(id: string) {
    const selectedHero = this.heroesList.find((hero: { id: string; }) => hero.id === id);
    return selectedHero;
  }


}
