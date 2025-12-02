import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TalentDetail, TalentService } from '../talents.service';
import { AuthService } from '../auth.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-talent',
  standalone: true,
  imports: [CommonModule, RouterModule],
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

  constructor(
    private route: ActivatedRoute,
    private talentService: TalentService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('talent');

    if (!slug) {
      return;
    }

    this.talentService.getTalent(slug).subscribe({
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

  searchBuyeeForTalent() {
    window.open('https://buyee.jp/mercari/search?keyword=' + this.talent.japanese_name + '&status=on_sale&items=40&lang=en', '_blank');
  }

  searchBuyeeForSet(keyword: string) {
    window.open('https://buyee.jp/mercari/search?keyword=' + keyword + '&status=on_sale&items=40&lang=en', '_blank');
  }
}
