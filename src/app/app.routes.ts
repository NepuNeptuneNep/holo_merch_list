import { Routes } from '@angular/router';
import { TalentComponent } from './talent/talent.component';
import { TalentListComponent } from './talent-list/talent-list.component';
export const routes: Routes = [ 
    { path: '', redirectTo: "/list", pathMatch: "full"},
    { path: 'list', component: TalentListComponent },
    { path: ':talent', component: TalentComponent },
    { path: "*", redirectTo: '/list'}];
