import { Routes } from '@angular/router';
import { TalentComponent } from './talent/talent.component';
import { VtuberComponent } from './vtuber/vtuber.component';
export const routes: Routes = [
  { path: '', redirectTo: '/list', pathMatch: 'full' },
  { path: 'list', component: VtuberComponent },
  { path: ':talent', component: TalentComponent },
  { path: '*', redirectTo: '/list' },
];
