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

  constructor(private messageService: MessageService, private firestore: Firestore) {
  }

  getHeroes(): Observable<HeroInterface[]> {
    const heroCollection = collection(this.firestore, HeroService.url);
    this.messageService.add('Heroes fetched');
    return collectionData(heroCollection, {idField: 'id'}) as Observable<HeroInterface[]>;
  }

  getHeroById(id: string | undefined | null): Observable<HeroInterface | undefined> {
    const heroDocument = doc(this.firestore, HeroService.url + "/" + id);
    return docData(heroDocument, {idField: 'id'}) as Observable<HeroInterface>;
  }

  deleteHero(id: string): Promise<void> {
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
    const heroDocument = doc(this.firestore, HeroService.url + "/" + hero.id);
    let newHeroJSON = JSON.parse(JSON.stringify(hero));
    try {
      updateDoc(heroDocument, newHeroJSON);
    } catch (e) {
      console.error(e);
    }
  }
}
