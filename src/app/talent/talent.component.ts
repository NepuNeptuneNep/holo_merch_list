import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TalentDetail, TalentService } from '../talents.service';
import { AuthService } from '../auth.service';
import { BehaviorSubject, catchError, combineLatest, distinctUntilChanged, filter, map, of, shareReplay, switchMap } from 'rxjs';

@Component({
  selector: 'app-talent',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './talent.component.html',
  styleUrl: './talent.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TalentComponent {
  private readonly retrySubject = new BehaviorSubject<number>(0);
  private readonly errorSubject = new BehaviorSubject<string | null>(null);
  loadError$ = this.errorSubject.asObservable();
  private readonly emptyTalent: TalentDetail = {
    name: '',
    japanese_name: '',
    sets: [],
  };
  isSignedIn$ = this.authService.sessionToken$.pipe(map(token => !!token));
  talent$ = combineLatest([
    this.route.paramMap.pipe(
      map((params) => params.get('talent')),
      filter((slug): slug is string => !!slug),
      distinctUntilChanged()
    ),
    this.authService.authReady$.pipe(
      filter((ready) => ready)
    ),
    this.authService.sessionToken$.pipe(
      distinctUntilChanged()
    ),
    this.retrySubject.asObservable(),
  ]).pipe(
    switchMap(([slug]) => {
      this.errorSubject.next(null);
      return this.talentService.getTalent(slug).pipe(
        catchError(() => {
          this.errorSubject.next('Could not load this talent.');
          return of(this.emptyTalent);
        })
      );
    }),
    shareReplay({ bufferSize: 1, refCount: true })
  );

  constructor(
    private route: ActivatedRoute,
    private talentService: TalentService,
    private authService: AuthService
  ) {}

  hasSetHref(talent: TalentDetail | null | undefined): boolean {
    return !!talent?.sets?.[0]?.image_url;
  }

  retry(): void {
    this.retrySubject.next(this.retrySubject.value + 1);
  }

  searchBuyeeForTalent(talent: TalentDetail): void {
    this.searchBuyeeForSet(talent.japanese_name);
  }

  searchBuyeeForSet(keyword: string): void {
    const url = new URL('https://buyee.jp/mercari/search');
    url.search = new URLSearchParams({
      keyword,
      status: 'on_sale',
      items: '40',
      lang: 'en'
    }).toString();
    window.open(url.toString(), '_blank', 'noopener,noreferrer');
  }
}
