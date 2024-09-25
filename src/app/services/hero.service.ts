import { Injectable } from '@angular/core';
import {HeroInterface} from "../data/heroInterface";
import { HEROES } from "../data/mock-heroes";

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor() { }

  getHeroes(): HeroInterface[] {
    return HEROES;
  }
}
