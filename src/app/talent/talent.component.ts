import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { URL } from '../app.component';
import { Observable, combineLatest, BehaviorSubject, map } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Talent, TalentService } from '../talents.service';

@Component({
  selector: 'app-talent',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './talent.component.html',
  styleUrl: './talent.component.scss',
})
export class TalentComponent implements OnInit {
  talent: Talent = {
    name: 'Not found',
    japName: '',
    website_string: '',
    website_string_alt: '',
    series: '',
    special_sets: [],
    special_keyword: [],
    special_indicator: [],
  };

  birthdaySets = new BehaviorSubject<Set[]>([]);
  anniversarySets = new BehaviorSubject<Set[]>([]);
  otherSets = new BehaviorSubject<Set[]>([]);

  // how many of the 3 loaders have finished
  private loadersCompleted = 0;
  private readonly totalLoaders = 3;
  private loadingDone$ = new BehaviorSubject<boolean>(false);

  // 🔹 only true when loadingDone = true AND all three arrays are empty
  noMerchFound = combineLatest([
    this.birthdaySets,
    this.anniversarySets,
    this.otherSets,
    this.loadingDone$,
  ]).pipe(
    map(([birthdays, anniversaries, others, loaded]) => {
      if (!loaded) {
        // still loading something -> do NOT show "no merch"
        return false;
      }

      return (
        birthdays.length === 0 &&
        anniversaries.length === 0 &&
        others.length === 0
      );
    })
  );

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

        // fire off all three async loaders in parallel
        this.getBirthdayCelebrations();
        this.getAnniversaryCelebrations();
        this.getSpecialSets();
      },
      error: (err) => {
        if (err.status !== 404) {
          console.error('Error loading talent', err);
        }
      },
    });
  }

  // mark one of the loaders as done, and once all are done, flip the flag
  private markLoaderDone(): void {
    this.loadersCompleted++;
    if (this.loadersCompleted >= this.totalLoaders) {
      this.loadingDone$.next(true);
    }
  }

  getAltTalentName(talent: Talent) {
    if (talent.japName != '') {
      return talent.japName;
    } else {
      return talent.name;
    }
  }

  searchBuyeeForTalent(talent: Talent) {
    let searchUrl = 'https://buyee.jp/mercari/search?keyword=';

    searchUrl = searchUrl + this.getAltTalentName(talent) + ' ';

    searchUrl = searchUrl + '&status=on_sale&items=40&lang=en';

    window.open(searchUrl, '_blank');
  }

  searchBuyeeForSet(talent: Talent, keyword: string) {
    let searchUrl = 'https://buyee.jp/mercari/search?keyword=';

    searchUrl = searchUrl + this.getAltTalentName(talent) + ' ' + keyword;

    searchUrl = searchUrl + '&status=on_sale&items=40&lang=en';

    window.open(searchUrl, '_blank');
  }

  sortSets() {
    const currentBirthdaySets = this.birthdaySets.getValue();
    const sortedBirthdaySets = [...currentBirthdaySets].sort((a, b) =>
      a.setKeyword.localeCompare(b.setKeyword)
    );
    this.birthdaySets.next(sortedBirthdaySets);

    const currentAnniversarySets = this.anniversarySets.getValue();
    const sortedAnniversarySets = [...currentAnniversarySets].sort((a, b) =>
      a.setKeyword.localeCompare(b.setKeyword)
    );
    this.anniversarySets.next(sortedAnniversarySets);

    const currentOtherSets = this.otherSets.getValue();
    const sortedOtherSets = [...currentOtherSets].sort((a, b) =>
      a.setKeyword.localeCompare(b.setKeyword)
    );
    this.otherSets.next(sortedOtherSets);
  }

  async getSpecialSets(): Promise<void> {
    for (const setUrl in this.talent.special_sets) {
      const preview_img = await this.getPreviewImage(
        this.talent.special_sets[parseInt(setUrl)],
        this.talent.special_keyword[parseInt(setUrl)]
      );

      const set = {
        url: this.talent.special_sets[parseInt(setUrl)],
        img_url: preview_img,
        setKeyword: this.talent.special_keyword[parseInt(setUrl)],
      };

      if (this.talent.special_indicator[parseInt(setUrl)] == 'other') {
        const currentOtherSets = this.otherSets.getValue();
        const currentArray = [...currentOtherSets, set];
        this.otherSets.next(currentArray);
      } else if (
        this.talent.special_indicator[parseInt(setUrl)] == 'birthday'
      ) {
        const currentBirthdaySets = this.birthdaySets.getValue();
        const currentArray = [...currentBirthdaySets, set];
        this.birthdaySets.next(currentArray);
      } else {
        const currentAnniversarySets = this.anniversarySets.getValue();
        const currentArray = [...currentAnniversarySets, set];
        this.anniversarySets.next(currentArray);
      }
    }

    // done loading special sets
    this.sortSets();
    this.markLoaderDone();
  }

  async getBirthdayCelebrations(): Promise<void> {
    const celebrationType = 'birthday-celebration';

    for (let i = 2018; i <= 2024; i++) {
      const url = URL.replace('{{CHARACTER}}', this.talent.website_string)
        .replace('{{VAR1}}', celebrationType)
        .replace('{{VAR2}}', `${i}`);

      const url_alt = URL.replace(
        '{{CHARACTER}}',
        this.talent.website_string_alt
      )
        .replace('{{VAR1}}', celebrationType)
        .replace('{{VAR2}}', `${i}`);

      if (!(await this.checkUrl(url)) && !(await this.checkUrl(url_alt))) {
        continue;
      }

      const setKeyword = `${i}`;

      const img_url = await this.getPreviewImage(url, setKeyword);
      const img_url_alt = await this.getPreviewImage(url_alt, setKeyword);

      const currentBirthdaySets = this.birthdaySets.getValue();

      if (await this.checkUrl(url)) {
        const set = { url, img_url, setKeyword };
        const currentArray = [...currentBirthdaySets, set];
        this.birthdaySets.next(currentArray);
      } else if (await this.checkUrl(url_alt)) {
        const set = { url: url_alt, img_url: img_url_alt, setKeyword };
        const currentArray = [...currentBirthdaySets, set];
        this.birthdaySets.next(currentArray);
      }
    }

    // done loading birthday sets
    this.sortSets();
    this.markLoaderDone();
  }

  async getAnniversaryCelebrations(): Promise<void> {
    const celebrationType = 'anniversary-celebration';

    for (let i = 1; i <= 9; i++) {
      let number: string;
      switch (i) {
        case 1:
          number = '1st';
          break;
        case 2:
          number = '2nd';
          break;
        case 3:
          number = '3rd';
          break;
        default:
          number = `${i}th`;
          break;
      }

      const url = URL.replace('{{CHARACTER}}', this.talent.website_string)
        .replace('{{VAR1}}', number)
        .replace('{{VAR2}}', celebrationType);

      const url_alt = URL.replace(
        '{{CHARACTER}}',
        this.talent.website_string_alt
      )
        .replace('{{VAR1}}', number)
        .replace('{{VAR2}}', celebrationType);

      if (!(await this.checkUrl(url)) && !(await this.checkUrl(url_alt))) {
        continue;
      }

      const setKeyword = number;

      const img_url = await this.getPreviewImage(url, setKeyword);
      const img_url_alt = await this.getPreviewImage(url_alt, setKeyword);

      const currentAnniversarySets = this.anniversarySets.getValue();

      if (await this.checkUrl(url)) {
        const set = { url, img_url, setKeyword };
        const currentArray = [...currentAnniversarySets, set];
        this.anniversarySets.next(currentArray);
      } else if (await this.checkUrl(url_alt)) {
        const set = {
          url: url_alt,
          img_url: img_url_alt,
          setKeyword,
        };
        const currentArray = [...currentAnniversarySets, set];
        this.anniversarySets.next(currentArray);
      }
    }

    // done loading anniversary sets
    this.sortSets();
    this.markLoaderDone();
  }

  async getPreviewImage(url: string, setKeyword: string): Promise<string> {
    const response = await fetch(url);
    const html = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const img = doc.querySelector('img[alt*="set" i]');
    const src = img?.getAttribute('data-original-src');
    if (!src) {
      if (await this.checkUrl(url)) {
        return (
          'assets/previewImages/' + this.talent.name + '/' + setKeyword + '.png'
        );
      }
      return '';
    }
    return 'https:' + src;
  }

  async checkUrl(url: string): Promise<boolean> {
    try {
      const response = await fetch(url);
      return response.status !== 404;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}

class Set {
  url: string = '';
  img_url: string = '';
  setKeyword: string = '';
}
