import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TalentService, TalentPreview } from '../talents.service';
import { FormsModule } from '@angular/forms';
import { BehaviorSubject, Subscription, combineLatest, distinctUntilChanged, filter, map, Observable } from 'rxjs';
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
  private readonly thumbnailSize = 800;
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
    this.subscriptions.add(
      combineLatest([
        this.authService.authReady$,
        this.authService.sessionToken$.pipe(distinctUntilChanged()),
      ])
        .pipe(filter(([ready]) => ready))
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

  getThumbnailUrl(url: string | null | undefined): string {
    if (!url) {
      return '';
    }

    const sizeMatch = url.match(/_(\d{2,4})x\d{0,4}(?=\.)/);
    if (sizeMatch) {
      const width = Number(sizeMatch[1]);
      if (Number.isFinite(width) && width <= this.thumbnailSize) {
        return url;
      }
      return url.replace(/_\d{2,4}x\d{0,4}(?=\.)/, `_${this.thumbnailSize}x`);
    }

    if (!/\/cdn\/shop\//.test(url)) {
      return url;
    }

    return url.replace(
      /(\.(?:png|jpe?g|webp|avif))(\?.*)?$/i,
      `_${this.thumbnailSize}x$1$2`
    );
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
