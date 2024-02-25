import { HttpClient } from '@angular/common/http';
import { Injectable, Sanitizer } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { BehaviorSubject, Observable, ReplaySubject, Subject, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private heroes = new BehaviorSubject<any[]>([]);
  heroes$ = this.heroes.asObservable();
  private isLoading = new BehaviorSubject<boolean>(true);
  isLoading$ = this.isLoading.asObservable();
  private selectedHero = new BehaviorSubject<any>({});
  selectedHero$ = this.selectedHero.asObservable();
  heroesList: any[] = [];
  filteredHeroesList: any[] = [];
  constructor(private http: HttpClient,
    private sanitizer: DomSanitizer) {

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


  // getHeroesFromServer(): void {
  //this.http.get<any>('https://apimocha.com/angularheroes/heroes').subscribe(resp => {
  //this.heroesList = resp?.heroes;
  //this.filteredHeroesList = [...this.heroesList];
  //this.heroes.next(this.heroesList);
  //});
  //}

  //getHeroesFromServer_(): void {
  //const storedHeroesList = localStorage.getItem('heroesList');
  //if (storedHeroesList) {
  //this.heroesList = JSON.parse(storedHeroesList);
  //this.heroes.next(this.heroesList);
  //} else {
  //this.heroesList = this.her.heroes;
  //this.filteredHeroesList = [...this.heroesList];
  //this.heroes.next(this.heroesList);
  //localStorage.setItem('heroesList', JSON.stringify(this.heroesList));
  //}
  //}

  //setLoading(isLoading: boolean) {
  //this.isLoading.next(isLoading);
  //}

  //editHeroe(heroeToModify: any) {
  //const storedHeroesList = localStorage.getItem('heroesList');
  //if (storedHeroesList) {
  //this.heroesList = JSON.parse(storedHeroesList);
  //}
  //const updatedHeroes = this.heroesList.map(hero =>
  //hero.id === heroeToModify.id ? heroeToModify : hero
  //);
  //this.heroesList = updatedHeroes;
  //localStorage.setItem('heroesList', JSON.stringify(this.heroesList));
  //this.heroes.next([...this.heroesList]);
  //}

  //deleteHero(heroId: number) {
  //const storedHeroesList = localStorage.getItem('heroesList');
  //if (storedHeroesList) {
  //this.heroesList = JSON.parse(storedHeroesList);
  //}
  //const updatedHeroes = this.heroesList.filter(hero => hero.id !== heroId);
  //this.heroesList = [...updatedHeroes];
  //localStorage.setItem('heroesList', JSON.stringify(this.heroesList));
  //this.heroes.next([...this.heroesList]);
  //}

  //createHeroe(newHeroe: any) {
  //const storedHeroesList = localStorage.getItem('heroesList');
  //if (storedHeroesList) {
  //this.heroesList = JSON.parse(storedHeroesList);
  //}
  //const newHeroeWithId = { ...newHeroe, id: this.heroesList.length + 1 };
  //this.heroesList = [...this.heroesList, newHeroeWithId];
  //localStorage.setItem('heroesList', JSON.stringify(this.heroesList));
  //this.heroes.next([...this.heroesList]);
  //}

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

  private updateHeroesList(heroes: any[]): void {
    this.heroes.next(heroes);
    localStorage.setItem('heroesList', JSON.stringify(heroes));
  }

  setLoading(isLoading: boolean) {
    this.isLoading.next(isLoading);
  }

  editHero(heroeToModify: any) {
    this.heroesList = this.getStoredHeroesList();
    const updatedHeroes = this.heroesList.map(hero => hero.id === heroeToModify.id ? heroeToModify : hero);
    this.updateAndStoreHeroes(updatedHeroes);
  }

  deleteHero(heroId: number) {
    this.heroesList = this.getStoredHeroesList();
    const updatedHeroes = this.heroesList.filter(hero => hero.id !== heroId);
    this.updateAndStoreHeroes(updatedHeroes);
  }

  createHero(newHeroe: any) {
    this.heroesList = this.getStoredHeroesList();
    const newHeroeWithId = { ...newHeroe, id: (this.heroesList.length + 1).toString()};
    const updatedHeroes = [...this.heroesList, newHeroeWithId];
    console.log('UPDA', updatedHeroes);
    this.updateAndStoreHeroes(updatedHeroes);
  }

  private getStoredHeroesList(): any[] {
    const storedHeroesList = localStorage.getItem('heroesList');
    return storedHeroesList ? JSON.parse(storedHeroesList) : [];
  }

  private updateAndStoreHeroes(heroes: any[]): void {
    this.heroesList = heroes;
    this.updateHeroesList(heroes);
  }

  selectHero(hero: any) {
    debugger;
    this.selectedHero.next(hero);
  }

  clearSelectedHero() {
    this.selectedHero.next(null);
  }

  findHeroById(id: string) {
    const selectedHero = this.heroesList.find((hero: { id: any; }) => hero.id === id);
    return selectedHero;
  }


}
