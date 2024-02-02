import { Routes } from '@angular/router';
import { TalentComponent } from './talent/talent.component';
import { HololiveComponent } from './hololive/hololive.component';
export const routes: Routes = [
  { path: '', redirectTo: '/list', pathMatch: 'full' },
  { path: 'list', component: HololiveComponent },
  { path: ':talent', component: TalentComponent },
  { path: '*', redirectTo: '/list' },
];
