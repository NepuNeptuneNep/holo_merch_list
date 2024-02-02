import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { URL } from '../app.component';
import { Observable, combineLatest, BehaviorSubject, map } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Talent, talents } from '../talents.service';

@Component({
  selector: 'app-talent',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './talent.component.html',
  styleUrl: './talent.component.scss',
})
export class TalentComponent implements OnInit {
  talent: Talent =
    talents?.find(
      (i) =>
        i.website_string == this.route.snapshot.paramMap.get('talent') ||
        i.website_string_alt == this.route.snapshot.paramMap.get('talent')
    ) ?? new Talent('Not found', '', [], [], [], '', '');
  birthdaySets = new BehaviorSubject<Set[]>([]);
  anniversarySets = new BehaviorSubject<Set[]>([]);
  otherSets = new BehaviorSubject<Set[]>([]);

  combinedObservables = combineLatest([
    this.birthdaySets.asObservable(),
    this.anniversarySets.asObservable(),
    this.otherSets.asObservable(),
  ]).subscribe(() => {
    this.sortSets();
  });

  noMerchFound: Observable<boolean> = combineLatest([
    this.birthdaySets.asObservable(),
    this.anniversarySets.asObservable(),
    this.otherSets.asObservable(),
  ]).pipe(
    map(([birthdays, anniversaries, others]) => {
      return birthdays.length === 0 && anniversaries.length === 0 && others.length === 0;
    })
  );

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
    const sortedBirthdaySets = [...this.birthdaySets.getValue()].sort((a, b) =>
      a.setKeyword.localeCompare(b.setKeyword)
    );
    this.birthdaySets.next(sortedBirthdaySets);

    const sortedAnniversarySets = [...this.anniversarySets.getValue()].sort((a, b) =>
      a.setKeyword.localeCompare(b.setKeyword)
    );
    this.anniversarySets.next(sortedAnniversarySets);

    const sortedOtherSets = [...this.otherSets.getValue()].sort((a, b) =>
      a.setKeyword.localeCompare(b.setKeyword)
    );
    this.otherSets.next(sortedOtherSets);
  }

  constructor(private route: ActivatedRoute) {}

  async ngOnInit() {
    this.birthdaySets.subscribe();
    this.anniversarySets.subscribe();
    this.otherSets.subscribe();
    
    this.getBirthdayCelebrations();
    this.getAnniversaryCelebrations();
    this.getSpecialSets();
    console.log(this.birthdaySets);
    console.log(this.anniversarySets);
    console.log(this.otherSets);
  }

  async getSpecialSets(): Promise<void> {
    for (const setUrl in this.talent.special_sets) {
      const preview_img = await this.getPreviewImage(
        this.talent.special_sets[parseInt(setUrl)],
        this.talent.special_keyword[parseInt(setUrl)]
      );

      const set =  {
        url: this.talent.special_sets[parseInt(setUrl)],
        img_url: preview_img,
        setKeyword: this.talent.special_keyword[parseInt(setUrl)],
      }

      if (this.talent.special_indicator[parseInt(setUrl)] == 'other') {
        const currentArray = [...this.otherSets.getValue(), set];
        this.otherSets.next(currentArray);
      } else if (
        this.talent.special_indicator[parseInt(setUrl)] == 'birthday'
      ) {
        const currentArray = [...this.birthdaySets.getValue(), set];
        this.birthdaySets.next(currentArray);
      } else {
        const currentArray = [...this.anniversarySets.getValue(), set];
        this.anniversarySets.next(currentArray);
      }
    }
  }

  async getBirthdayCelebrations(): Promise<void> {
    const celebrationType = 'birthday-celebration';

    for (let i = 2018; i <= 2024; i++) {
      const url = URL.replace('{{CHARACTER}}', this.talent.website_string)
        .replace('{{VAR1}}', celebrationType)
        .replace('{{VAR2}}', `${i}`);
      console.log(url);

      const url_alt = URL.replace(
        '{{CHARACTER}}',
        this.talent.website_string_alt
      )
        .replace('{{VAR1}}', celebrationType)
        .replace('{{VAR2}}', `${i}`);
      console.log(url_alt);

      if (!(await this.checkUrl(url)) && !(await this.checkUrl(url_alt))) {
        continue;
      }

      const setKeyword = `${i}`;

      const img_url = await this.getPreviewImage(url, setKeyword);
      const img_url_alt = await this.getPreviewImage(url_alt, setKeyword);

      if (await this.checkUrl(url)) {
        const set = { url, img_url, setKeyword };
        const currentArray = [...this.birthdaySets.getValue(), set];
        this.birthdaySets.next(currentArray);
        console.log(url + ' ' + img_url);
      } else if (await this.checkUrl(url_alt)) {
        const set = { url: url_alt, img_url: img_url_alt, setKeyword };
        const currentArray = [...this.birthdaySets.getValue(), set];
        this.birthdaySets.next(currentArray);
        console.log(url_alt + ' ' + img_url_alt);
      }
    }
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
      console.log(url);

      const url_alt = URL.replace(
        '{{CHARACTER}}',
        this.talent.website_string_alt
      )
        .replace('{{VAR1}}', number)
        .replace('{{VAR2}}', celebrationType);
      console.log(url_alt);

      if (!(await this.checkUrl(url)) && !(await this.checkUrl(url_alt))) {
        continue;
      }

      const setKeyword = number;

      const img_url = await this.getPreviewImage(url, setKeyword);
      const img_url_alt = await this.getPreviewImage(url_alt, setKeyword);

      if (await this.checkUrl(url)) {
        const set = { url, img_url, setKeyword };
        const currentArray = [...this.anniversarySets.getValue(), set];
        console.log(url + ' ' + img_url);
        this.anniversarySets.next(currentArray);
      } else if (await this.checkUrl(url_alt)) {
        const set = {
          url: url_alt,
          img_url: img_url_alt,
          setKeyword,
        };
        const currentArray = [...this.anniversarySets.getValue(), set];
        console.log(url_alt + ' ' + img_url_alt);
        this.anniversarySets.next(currentArray);
      }
    }
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
    console.log(src);
    return 'https:' + src;
  }

  async checkUrl(url: string): Promise<boolean> {
    try {
      const response = await fetch(url);
      console.log(response.status);
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
