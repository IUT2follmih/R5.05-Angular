import {Component, OnInit, OnDestroy} from '@angular/core';
import {HeroInterface} from "../../data/heroInterface";
import {HeroService} from "../../services/hero.service";
import {RouterLink} from "@angular/router";
import {MessageService} from "../../services/message.service";
import {Subscription} from "rxjs";
import {CardHeroComponent} from "../card-hero/card-hero.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    RouterLink,
    CardHeroComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit, OnDestroy {
  subscriptionGetHeroes?: Subscription;
  topHeroes: HeroInterface[] = [];
  selectedHero?: HeroInterface;

  constructor(private heroService: HeroService, private messageService: MessageService) {
  }

  ngOnInit(): void {
    this.subscriptionGetHeroes = this.heroService.getHeroes().subscribe();
    this.getTopHeroes();
  }

  ngOnDestroy(): void {
    this.subscriptionGetHeroes?.unsubscribe();
  }

  onSelect(hero: HeroInterface): void {
    console.log("onSelect dashboard component");
    this.selectedHero = hero;
    this.selectedHero.vote++;
    this.messageService.clear();
    this.messageService.add(`HeroesComponent: Selected hero id=${hero.id}`);
  }

  getTopHeroes(): void {
    this.heroService.getHeroes().subscribe(heroes => {
      this.topHeroes = this.bubbleSort(heroes);
      this.topHeroes = this.topHeroes.slice(0, 4);
    });
  }

  bubbleSort(heroes: HeroInterface[]): HeroInterface[] {
    heroes = heroes.filter(hero => hero.vote > 0);
    let n = heroes.length;
    let swapped;
    do {
      swapped = false;
      for (let i = 0; i < n - 1; i++) {
        if (heroes[i].vote < heroes[i + 1].vote) {
          let temp = heroes[i];
          heroes[i] = heroes[i + 1];
          heroes[i + 1] = temp;
          swapped = true;
        }
      }
      n--;
    } while (swapped);
    return heroes;
  }
}
