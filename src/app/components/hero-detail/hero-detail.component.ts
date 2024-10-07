import {Component, inject, Input, OnInit} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {UpperCasePipe} from "@angular/common";
import {HeroInterface} from "../../data/heroInterface";
import {ActivatedRoute} from '@angular/router';
import {HeroService} from "../../services/hero.service";
import {MessageService} from "../../services/message.service";

@Component({
  selector: 'app-hero-detail',
  standalone: true,
  imports: [
    FormsModule,
    UpperCasePipe
  ],
  templateUrl: './hero-detail.component.html',
  styleUrl: './hero-detail.component.css'
})
export class HeroDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);

  @Input() hero?: HeroInterface;


  heroID: number | undefined | null;

  constructor(private heroService: HeroService, private messageService: MessageService) {
  }

  ngOnInit() {
    console.log(this.heroService.getHeroById(this.heroID));
    this.route.params.subscribe(params => {
      this.heroID = +params['id'];
    });

    if (this.heroID) {
      this.heroService.getHeroById(this.heroID).subscribe(hero => this.hero = hero);
      console.log(this.hero);
    } else {
      this.messageService.add('Error Hero not found');
    }
  };
}
