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

  her = {
    "heroes": [
      {
        "id": '1',
        "name": "Superman",
        "alias": "Clark Kent",
        "power": "Super strength, flight, invulnerability",
        "image": ""
      },
      {
        "id": '2',
        "name": "Wonder Woman",
        "alias": "Diana Prince",
        "power": "Superhuman strength, agility, combat skills",
        "image": ""
      },
      {
        "id": '3',
        "name": "Spider-Man",
        "alias": "Peter Parker",
        "power": "Wall-crawling, superhuman strength, spider sense",
        "image": ""
      },
      {
        "id": '4',
        "name": "Batman",
        "alias": "Bruce Wayne",
        "power": "Genius intellect, martial arts skills, gadgets",
        "image": ""
      },
      {
        "id": '5',
        "name": "Iron Man",
        "alias": "Tony Stark",
        "power": "Powered armor suit, genius inventor",
        "image": ""
      },
      {
        "id": '6',
        "name": "Captain America",
        "alias": "Steve Rogers",
        "power": "Peak human strength and agility, shield mastery",
        "image": ""
      },
      {
        "id": '7',
        "name": "Thor",
        "alias": "Thor Odinson",
        "power": "God of Thunder, superhuman strength, Mjolnir",
        "image": ""
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
        "power": "light"
      }
    ]
  }


  getHeroesFromServer(): void {
    this.http.get<any>('https://apimocha.com/angularheroes/heroes').subscribe(resp => {
      this.heroesList = resp?.heroes || [];
      this.updateHeroesList(this.heroesList);
    });
  }

  getHeroesFromLocalStorage(): void {
    const storedHeroesList = localStorage.getItem('heroesList');
    this.heroesList = storedHeroesList ? JSON.parse(storedHeroesList) : localStorage.setItem('heroesList', JSON.stringify(this.her.heroes));
    this.updateHeroesList(this.heroesList);
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
