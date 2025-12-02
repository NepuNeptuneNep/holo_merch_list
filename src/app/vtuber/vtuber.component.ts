import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TalentService, TalentPreview } from '../talents.service';
import { FormsModule } from '@angular/forms';
import { BehaviorSubject, combineLatest, Observable, map } from 'rxjs';
import { KebabPipe } from '../kebabcase.pipe';
import { AuthService, UserProfile } from '../auth.service';

@Component({
  selector: 'app-vtuber',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, KebabPipe],
  templateUrl: './vtuber.component.html',
  styleUrl: './vtuber.component.scss',
})

export class VtuberComponent {
  talents = new BehaviorSubject<TalentPreview[]>([]);
  filter = new BehaviorSubject<string>('');
  isAuthenticating = false;
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
    this.talentService.getTalents().subscribe(async talents => {
      this.talents.next(talents);
    });
  }

  getValue(event: Event): string {
    return (event.target as HTMLInputElement).value;
  }

  signInWithGoogle(): void {
    this.isAuthenticating = true;
    this.authMessage = '';

    this.authService.signInWithGooglePopup().subscribe({
      next: () => {
        this.authMessage = 'Signed in successfully.';
        setTimeout(() => window.location.reload(), 100);
      },
      error: (error: any) => {
        if (error?.status === 403) {
          this.authMessage = 'This Google account is not allowed for access.';
        } else if (error?.message) {
          this.authMessage = error.message;
        } else {
          this.authMessage = 'Google sign-in failed. Please try again.';
        }
        this.isAuthenticating = false;
      },
      complete: () => {
        this.isAuthenticating = false;
      },
    });
  }

  signOut(): void {
    this.authService.signOut();
    setTimeout(() => window.location.reload(), 50);
  }
}
