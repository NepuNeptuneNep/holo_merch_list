import { Component, DestroyRef, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TalentDetail, TalentService } from '../talents.service';
import { AuthService } from '../auth.service';
import { combineLatest, distinctUntilChanged, filter, map } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-talent',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './talent.component.html',
  styleUrl: './talent.component.scss',
})
export class TalentComponent implements OnInit {
  talent: TalentDetail = {
    name: '',
    japanese_name: '',
    sets: [],
  };
  isSignedIn$ = this.authService.sessionToken$.pipe(map(token => !!token));
  private slug: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private talentService: TalentService,
    private authService: AuthService,
    private readonly destroyRef: DestroyRef
  ) {}

  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('talent');

    if (!slug) {
      return;
    }

    this.slug = slug;
    combineLatest([
      this.authService.authReady$,
      this.authService.sessionToken$.pipe(distinctUntilChanged()),
    ])
      .pipe(
        filter(([ready]) => ready),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(() => {
        this.loadTalent();
      });
  }

  hasSetHref(): boolean {
    return !!this.talent?.sets?.[0]?.image_url;
  }

  searchBuyeeForTalent() {
    window.open('https://buyee.jp/mercari/search?keyword=' + this.talent.japanese_name + '&status=on_sale&items=40&lang=en', '_blank');
  }

  searchBuyeeForSet(keyword: string) {
    window.open('https://buyee.jp/mercari/search?keyword=' + keyword + '&status=on_sale&items=40&lang=en', '_blank');
  }

  private loadTalent(): void {
    if (!this.slug) {
      return;
    }
    this.talentService.getTalent(this.slug).subscribe({
      next: (t) => {
        this.talent = t;
      },
      error: (err) => {
        if (err.status !== 404) {
          console.error('Error loading talent', err);
        }
      },
    });
  }
}
