import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TalentDetail, TalentService } from '../talents.service';

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

  constructor(
    private route: ActivatedRoute,
    private talentService: TalentService
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
    let searchUrl = 'https://buyee.jp/mercari/search?keyword=';

    searchUrl = searchUrl + this.talent.japanese_name;

    searchUrl = searchUrl + '&status=on_sale&items=40&lang=en';

    window.open(searchUrl, '_blank');
  }

  searchBuyeeForSet(keyword: string) {
    let searchUrl = 'https://buyee.jp/mercari/search?keyword=';

    searchUrl = searchUrl + keyword;

    searchUrl = searchUrl + '&status=on_sale&items=40&lang=en';

    window.open(searchUrl, '_blank');
  }
}
