import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TalentService, TalentPreview } from '../talents.service';
import { FormsModule } from '@angular/forms';
import { BehaviorSubject, Subscription, combineLatest, distinctUntilChanged, map, Observable } from 'rxjs';
import { KebabPipe } from '../kebabcase.pipe';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-vtuber',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, KebabPipe],
  templateUrl: './vtuber.component.html',
  styleUrl: './vtuber.component.scss',
})
export class VtuberComponent implements OnInit, OnDestroy {
  talents = new BehaviorSubject<TalentPreview[]>([]);
  filter = new BehaviorSubject<string>('');
  private readonly subscriptions = new Subscription();

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
    this.loadTalents();
    this.subscriptions.add(
      this.authService.sessionToken$
        .pipe(distinctUntilChanged())
        .subscribe(() => {
          this.loadTalents();
        })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  getValue(event: Event): string {
    return (event.target as HTMLInputElement).value;
  }
  
  hasAnyHref(talents: TalentPreview[] | null | undefined): boolean {
    return !!talents?.some(t => !!t?.character_image_url);
  }


  signInWithGoogle(): void {
    this.authMessage = 'Redirecting...';
    this.authService.signInWithGoogle();
  }

  signOut(): void {
    this.authService.signOut();
    this.authMessage = 'Signed out.';
  }

  private loadTalents(): void {
    this.talentService.getTalents().subscribe(talents => {
      this.talents.next(talents);
    });
  }
}
