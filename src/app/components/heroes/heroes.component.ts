import { Component } from '@angular/core';
import {HeroInterface} from "./heroInterface";
import {UpperCasePipe} from "@angular/common";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-heroes',
  standalone: true,
  imports: [
    UpperCasePipe,
    FormsModule
  ],
  templateUrl: './heroes.component.html',
  styleUrl: './heroes.component.css'
})
export class HeroesComponent {
  hero: HeroInterface = {
    id: 1,
    name: 'Windstorm'
  }
}
