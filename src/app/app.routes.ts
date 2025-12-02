import { Routes } from '@angular/router';
import { TalentComponent } from './talent/talent.component';
import { VtuberComponent } from './vtuber/vtuber.component';
export const routes: Routes = [
  { path: '', component: VtuberComponent, pathMatch: 'full' },
  { path: ':talent', component: TalentComponent },
  { path: '**', component: VtuberComponent },
];
