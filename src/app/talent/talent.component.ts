import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TalentDetail, TalentService } from '../talents.service';
import { AuthService } from '../auth.service';
import { catchError, combineLatest, distinctUntilChanged, filter, map, of, shareReplay, switchMap } from 'rxjs';

@Component({
  selector: 'app-talent',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './talent.component.html',
  styleUrl: './talent.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TalentComponent {
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
  ]).pipe(
    switchMap(([slug]) =>
      this.talentService.getTalent(slug).pipe(
        catchError(() => of(this.emptyTalent))
      )
    ),
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

  searchBuyeeForTalent(talent: TalentDetail): void {
    window.open('https://buyee.jp/mercari/search?keyword=' + talent.japanese_name + '&status=on_sale&items=40&lang=en', '_blank');
  }

  searchBuyeeForSet(keyword: string): void {
    window.open('https://buyee.jp/mercari/search?keyword=' + keyword + '&status=on_sale&items=40&lang=en', '_blank');
  }
}
