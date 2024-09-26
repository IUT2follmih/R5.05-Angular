import {Component, OnInit} from '@angular/core';
import {HeroInterface} from "../../data/heroInterface";
import {UpperCasePipe} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {HeroService} from "../../services/hero.service";
import {MessageService} from "../../services/message.service";
import {MessagesComponent} from "../messages/messages.component";
import {RouterLink, RouterOutlet} from "@angular/router";
import {HeroDetailComponent} from "../hero-detail/hero-detail.component";

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
export class HeroesComponent implements OnInit{
  heroes: HeroInterface[] = [];
  selectedHero?: HeroInterface;

  constructor(private heroService: HeroService, private messageService: MessageService ) {
  }

  ngOnInit(): void {
    this.getHeroes();
  }

  onSelect(hero: HeroInterface): void {
    console.log("onSelect hero component");
    this.selectedHero = hero;
    this.selectedHero.vote++;
    this.messageService.clear();
    this.messageService.add(`HeroesComponent: Selected hero id=${hero.id}`);
  }

  getHeroes(): void {
    this.heroService.getHeroes().subscribe(heroes => this.heroes = heroes);
  }
  protected readonly onselect = onselect;
}
