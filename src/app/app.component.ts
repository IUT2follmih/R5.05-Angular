import { Component } from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {HeroesComponent} from "./components/heroes/heroes.component";
import {MessagesComponent} from "./components/messages/messages.component";
import {NavbarComponent} from "./components/navbar/navbar.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, NavbarComponent, MessagesComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Hugo Follmi ';
}
