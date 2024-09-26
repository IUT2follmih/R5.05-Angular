import {Component, inject, Input, OnInit} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {UpperCasePipe} from "@angular/common";
import {HeroInterface} from "../../data/heroInterface";
import {ActivatedRoute, Router} from '@angular/router';
import {HeroService} from "../../services/hero.service";

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
  private router = inject(Router);

  @Input() hero?: HeroInterface;

  heroID: number | undefined | null;

  constructor(private heroService: HeroService) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.heroID = +params['id'];
    });
    this.heroService.getHeroById(this.heroID).subscribe(hero => this.hero = hero);
  };

}
