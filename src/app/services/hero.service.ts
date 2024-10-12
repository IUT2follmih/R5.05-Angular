import {Injectable} from '@angular/core';
import {HeroInterface} from "../data/heroInterface";
import {Observable} from "rxjs";
import {MessageService} from "./message.service";
import {
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  docData,
  Firestore,
  updateDoc
} from "@angular/fire/firestore";

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private static url = 'heroes';
  readonly maxStatsPoints = 40;
  isUpdating = false;
  isUpdateSuccess = 1;
  private updateTimer: ReturnType<typeof setTimeout> | undefined;

  constructor(private messageService: MessageService, private firestore: Firestore) {
  }

  // Méthodes de gestion des héros
  getHeroes(): Observable<HeroInterface[]> {
    const heroCollection = collection(this.firestore, HeroService.url);
    this.messageService.add('Heroes fetched');
    return collectionData(heroCollection, {idField: 'id'}) as Observable<HeroInterface[]>;
  }

  getHeroById(id: string | undefined | null): Observable<HeroInterface | undefined> {
    const heroDocument = doc(this.firestore, HeroService.url + "/" + id);
    return docData(heroDocument, {idField: 'id'}) as Observable<HeroInterface>;
  }

  deleteHero(id: number): Promise<void> {
    const heroDocument = doc(this.firestore, HeroService.url + "/" + id);
    try {
      return deleteDoc(heroDocument);
    } catch (e) {
      console.error(e);
      return Promise.reject(e);
    }
  }

  addHero(hero: HeroInterface): void {
    const heroCollection = collection(this.firestore, HeroService.url);
    try {
      addDoc(heroCollection, hero);
    } catch (e) {
      console.error(e);
    }
  }

  updateHero(hero: HeroInterface): void {
    this.isUpdating = true;
    const heroDocument = doc(this.firestore, HeroService.url + "/" + hero.id);
    let newHeroJSON = JSON.parse(JSON.stringify(hero));
    clearTimeout(this.updateTimer as unknown as number);

    this.updateTimer = setTimeout(async () => {
      try {
        await updateDoc(heroDocument, newHeroJSON);
        this.isUpdateSuccess = 2;
        this.messageService.add('Hero updated');
      } catch (e) {
        this.isUpdateSuccess = 0;
        console.error(e);
      } finally {
        setTimeout(() => {
          this.isUpdateSuccess = 1;
          this.isUpdating = false;
        }, 1000);
      }
    }, 700);
  }

  // Méthpdes de gestion des statistiques
  getStatPoints(hero: HeroInterface): number {
    return hero.attack + hero.health + hero.evasion;
  }

  getStatPointsLeft(hero: HeroInterface): number {
    return this.maxStatsPoints - this.getStatPoints(hero);
  }

  isMaxStatsPointsReached(hero: HeroInterface): boolean {
    return this.getStatPoints(hero) >= this.maxStatsPoints;
  }

  isMinStatReached(hero: HeroInterface, stat: string): boolean {
    switch (stat) {
      case 'attack':
        return hero.attack === 0;
      case 'health':
        return hero.health === 0;
      case 'evasion':
        return hero.evasion === 0;
      default:
        return false;
    }
  }

  updateStat(hero: HeroInterface, stat: string, increase: boolean): void {
    if (this.isMaxStatsPointsReached(hero) && increase) {
      return;
    }
    switch (stat) {
      case 'attack':
        if (increase) {
          hero.attack++;
        } else {
          hero.attack--;
        }
        break;
      case 'health':
        if (increase) {
          hero.health++;
        } else {
          hero.health--;
        }
        break;
      case 'evasion':
        if (increase) {
          hero.evasion++;
        } else {
          hero.evasion--;
        }
        break;
    }
  }
}
