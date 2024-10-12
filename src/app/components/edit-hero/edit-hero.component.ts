import {Component, Input, OnInit} from '@angular/core';
import {HeroInterface} from "../../data/heroInterface";
import {HeroService} from "../../services/hero.service";
import {MessageService} from "../../services/message.service";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-edit-hero',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './edit-hero.component.html',
  styleUrl: './edit-hero.component.css'
})
export class EditHeroComponent implements OnInit {
  @Input() hero?: HeroInterface;

  constructor(private heroService: HeroService, private messageService: MessageService) {
  }

  ngOnInit() {
  }

  updateHero(hero: HeroInterface): void {
    this.messageService.add('Hero updated');
    this.heroService.updateHero(hero);
  }

  deleteHero(hero: HeroInterface): void {
    this.messageService.add('Hero deleted');
    this.heroService.deleteHero(hero.id);
  }
}
