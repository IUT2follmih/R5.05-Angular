import {Injectable} from '@angular/core';
import {HeroInterface} from "../data/heroInterface";
import {HEROES} from "../data/mock-heroes";
import {Observable, of} from "rxjs";
import {MessageService} from "./message.service";

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor(private messageService: MessageService) {
  }

  getHeroes(): Observable<HeroInterface[]> {
    const heroes = of(HEROES);
    this.messageService.add('Heroes fetched')
    return heroes;
    /*const heroes: Observable<HeroInterface[]> = new Observable(observer => {
      observer.next(HEROES.slice(0,2)); // 2 éléments envoyés
      setTimeout(() => {
        observer.next(HEROES); observer.complete();
      }, 3000); });
    return heroes;*/
  }
}
