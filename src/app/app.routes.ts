import {Routes} from '@angular/router';
import {HeroesComponent} from "./components/heroes/heroes.component";
import {HeroDetailComponent} from "./components/hero-detail/hero-detail.component";
import {DashboardComponent} from "./components/dashboard/dashboard.component";

export const routes: Routes = [
  {path: '', redirectTo: '/heroes', pathMatch: 'full'},
  {path: 'heroes', component: HeroesComponent},
  {path: 'heroes-edit/:id', component: HeroDetailComponent},
  {path: 'dashboard', component: DashboardComponent},
];
