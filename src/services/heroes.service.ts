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
        "power": "Super strength, flight, invulnerability",
        "image": "https://i.ibb.co/fQ7PtZb/843d3cc2bea7c8df224e878e8b6326dd.jpg"
      },
      {
        "id": '2',
        "name": "Wonder Woman",
        "alias": "Diana Prince",
        "power": "Superhuman strength, agility, combat skills",
        "image": "https://i.ibb.co/BP4XNXV/5534efecdb37c4674334477527c3c67d.jpg"
      },
      {
        "id": '3',
        "name": "Spider-Man",
        "alias": "Peter Parker",
        "power": "Wall-crawling, superhuman strength, spider sense",
        "image": "https://i.ibb.co/vwqb8nk/019a76446d1d41672e83c32d11ffb705.jpg"
      },
      {
        "id": '4',
        "name": "Batman",
        "alias": "Bruce Wayne",
        "power": "Genius intellect, martial arts skills, gadgets",
        "image": "https://i.ibb.co/y6kxdSb/a91c05fd69e22b4ee8e87859e1368137.jpg"
      },
      {
        "id": '5',
        "name": "Iron Man",
        "alias": "Tony Stark",
        "power": "Powered armor suit, genius inventor",
        "image": "https://i.ibb.co/NKWCfBk/a8716f8f85b1ac5963700d971462c70a.jpg"
      },
      {
        "id": '6',
        "name": "Captain America",
        "alias": "Steve Rogers",
        "power": "Peak human strength and agility, shield mastery",
        "image": "https://i.ibb.co/dQ8W7y4/1941cf28de7db3deeec7d4c6ca935649.jpg"
      },
      {
        "id": '7',
        "name": "Thor",
        "alias": "Thor Odinson",
        "power": "God of Thunder, superhuman strength, Mjolnir",
        "image": "https://i.ibb.co/42CrPjg/2298.jpg"
      },
      {
        "id": '8',
        "name": "Black Widow",
        "alias": "Natasha Romanoff",
        "power": "Master spy, expert martial artist, agility",
        "image": ""
      },
      {
        "id": '9',
        "name": "Hulk",
        "alias": "Bruce Banner",
        "power": "Superhuman strength, durability, regeneration",
        "image": ""
      },
      {
        "id": '10',
        "name": "Black Panther",
        "alias": "T'Challa",
        "power": "Enhanced strength, speed, agility, vibranium suit",
        "image": ""
      },
      {
        "id": '11',
        "name": "Captain Marvel",
        "alias": "Carol Danvers",
        "power": "Flight, superhuman strength, energy manipulation",
        "image": ""
      },
      {
        "id": '12',
        "name": "Flash",
        "alias": "Barry Allen",
        "power": "Super speed, time manipulation",
        "image": ""
      },
      {
        "id": '13',
        "name": "Green Lantern",
        "alias": "Hal Jordan",
        "power": "Power ring, constructs from willpower",
        "image": ""
      },
      {
        "id": '14',
        "name": "Aquaman",
        "alias": "Arthur Curry",
        "power": "Atlantean physiology, control over sea life",
        "image": ""
      },
      {
        "id": '15',
        "name": "Supergirl",
        "alias": "Kara Zor-El",
        "power": "light",
        "image": ""
      }
    ]



  getHeroesFromServer(): void {
    this.http.get<any>('https://apimocha.com/angularheroes/heroes').subscribe(resp => {
      this.heroesList = resp?.heroes || [];
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
