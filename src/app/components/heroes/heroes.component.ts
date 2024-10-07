import {Component, OnInit, OnDestroy} from '@angular/core';
import {HeroInterface} from "../../data/heroInterface";
import {UpperCasePipe} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {HeroService} from "../../services/hero.service";
import {MessageService} from "../../services/message.service";
import {MessagesComponent} from "../messages/messages.component";
import {RouterLink, RouterOutlet} from "@angular/router";
import {HeroDetailComponent} from "../hero-detail/hero-detail.component";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-heroes',
  standalone: true,
  imports: [
    UpperCasePipe,
    FormsModule,
    MessagesComponent,
    RouterOutlet,
    RouterLink,
    HeroDetailComponent
  ],
  templateUrl: './heroes.component.html',
  styleUrl: './heroes.component.css'
})
export class HeroesComponent implements OnInit, OnDestroy {
  subscriptionGetHeroes?: Subscription;
  heroes: HeroInterface[] = [];
  selectedHero?: HeroInterface;

  constructor(private heroService: HeroService) {
  }

  ngOnInit(): void {
    this.subscriptionGetHeroes = this.heroService.getHeroes().subscribe();
    this.getHeroes()
  }

  ngOnDestroy(): void {
    this.subscriptionGetHeroes?.unsubscribe();
  }

  onSelect(hero: HeroInterface): void {
    this.selectedHero = hero;
    this.selectedHero.vote++;
  }

  getHeroes(): void {
    this.heroService.getHeroes().subscribe(heroes => this.heroes = heroes);
  }

  protected readonly onselect = onselect;
}
