import {Component, Input} from '@angular/core';
import {HeroInterface} from "../../data/heroInterface";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-card-hero',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './card-hero.component.html',
  styleUrl: './card-hero.component.css',
})
export class CardHeroComponent {
  selectedHero?: HeroInterface | undefined;
  @Input() hero?: HeroInterface;

  onSelect(hero: HeroInterface | undefined): void {
    this.selectedHero = hero;
  }
}
