import {Component, inject, OnInit} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {UpperCasePipe} from "@angular/common";
import {HeroInterface} from "../../data/heroInterface";
import {ActivatedRoute} from '@angular/router';
import {HeroService} from "../../services/hero.service";
import {MessageService} from "../../services/message.service";
import {EditHeroComponent} from "../edit-hero/edit-hero.component";

@Component({
  selector: 'app-hero-detail',
  standalone: true,
  imports: [
    FormsModule,
    UpperCasePipe,
    EditHeroComponent
  ],
  templateUrl: './hero-detail.component.html',
  styleUrl: './hero-detail.component.css'
})
export class HeroDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);

  hero!: HeroInterface;

  heroID: string | undefined | null;

  constructor(protected heroService: HeroService, private messageService: MessageService) {
  }

  ngOnInit() {
    this.heroID = this.route.snapshot.paramMap.get('id');
    if (this.heroID) {
      let checkObservable = this.heroService.getHeroById(this.heroID);
      if (checkObservable) {
        checkObservable.subscribe(hero => this.hero = hero as HeroInterface);
      }
    } else {
      this.messageService.add('Error Hero not found');
    }
  };

  voteHero(hero: HeroInterface): void {
    if (hero.vote > 0) {
      hero.vote = 0;
    } else {
      hero.vote = 1;
    }
    this.heroService.updateHero(hero);
  }
}
