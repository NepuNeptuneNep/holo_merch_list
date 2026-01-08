import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TalentService, TalentPreview } from '../talents.service';
import { FormsModule } from '@angular/forms';
import { BehaviorSubject, combineLatest, Observable, map } from 'rxjs';
import { KebabPipe } from '../kebabcase.pipe';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-vtuber',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, KebabPipe],
  templateUrl: './vtuber.component.html',
  styleUrl: './vtuber.component.scss',
})
export class VtuberComponent implements OnInit {
  talents = new BehaviorSubject<TalentPreview[]>([]);
  filter = new BehaviorSubject<string>('');

  authMessage = '';
  profile$ = this.authService.profile$;
  isSignedIn$ = this.authService.sessionToken$.pipe(map(token => !!token));

  filtered_talent_list: Observable<TalentPreview[]> =
    combineLatest([this.talents.asObservable(), this.filter.asObservable()]).pipe(
      map(([talents, filterString]) =>
        talents.filter(t =>
          t.name.toLowerCase().trim().includes(filterString.toLowerCase().trim())
        )
      )
    );

  constructor(
    private talentService: TalentService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.talentService.getTalents().subscribe(talents => {
      this.talents.next(talents);
    });
  }

  getValue(event: Event): string {
    return (event.target as HTMLInputElement).value;
  }

  signInWithGoogle(): void {
    this.authMessage = 'Redirecting...';
    this.authService.signInWithGoogle();
  }

  signOut(): void {
    this.authService.signOut();
    this.authMessage = 'Signed out.';
  }
}