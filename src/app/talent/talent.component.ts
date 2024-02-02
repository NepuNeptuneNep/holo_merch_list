import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { URL } from '../app.component';
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
  birthdaySets: Set[] = [];
  anniversarySets: Set[] = [];
  otherSets: Set[] = [];
  noMerchFound: boolean = false;

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
    const sortedBirthdaySets = [...this.birthdaySets].sort((a, b) =>
      a.setKeyword.localeCompare(b.setKeyword)
    );
    this.birthdaySets = sortedBirthdaySets;

    const sortedAnniversarySets = [...this.anniversarySets].sort((a, b) =>
      a.setKeyword.localeCompare(b.setKeyword)
    );
    this.anniversarySets = sortedAnniversarySets;

    const sortedOtherSets = [...this.otherSets].sort((a, b) =>
      a.setKeyword.localeCompare(b.setKeyword)
    );
    this.otherSets = sortedOtherSets;
  }

  constructor(private route: ActivatedRoute) {}

  async ngOnInit() {
    await this.getBirthdayCelebrations();
    await this.getAnniversaryCelebrations();
    await this.getSpecialSets();
    console.log(this.birthdaySets);
    console.log(this.anniversarySets);
    console.log(this.otherSets);

    if (
      this.birthdaySets.length == 0 &&
      this.anniversarySets.length == 0 &&
      this.otherSets.length == 0
    ) {
      this.noMerchFound = true;
    }
  }

  async getSpecialSets(): Promise<void> {
    for (const setUrl in this.talent.special_sets) {
      const preview_img = await this.getPreviewImage(
        this.talent.special_sets[parseInt(setUrl)],
        this.talent.special_keyword[parseInt(setUrl)]
      );
      if (this.talent.special_indicator[parseInt(setUrl)] == 'other') {
        this.otherSets.push({
          url: this.talent.special_sets[parseInt(setUrl)],
          img_url: preview_img,
          setKeyword: this.talent.special_keyword[parseInt(setUrl)],
        });
      } else if (
        this.talent.special_indicator[parseInt(setUrl)] == 'birthday'
      ) {
        this.birthdaySets.push({
          url: this.talent.special_sets[parseInt(setUrl)],
          img_url: preview_img,
          setKeyword: this.talent.special_keyword[parseInt(setUrl)],
        });
      } else {
        this.anniversarySets.push({
          url: this.talent.special_sets[parseInt(setUrl)],
          img_url: preview_img,
          setKeyword: this.talent.special_keyword[parseInt(setUrl)],
        });
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
        this.birthdaySets.push({ url, img_url, setKeyword });
        console.log(url + ' ' + img_url);
      } else if (await this.checkUrl(url_alt)) {
        this.birthdaySets.push({
          url: url_alt,
          img_url: img_url_alt,
          setKeyword,
        });
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
        this.anniversarySets.push({ url, img_url, setKeyword });
        console.log(url + ' ' + img_url);
      } else if (await this.checkUrl(url_alt)) {
        this.anniversarySets.push({
          url: url_alt,
          img_url: img_url_alt,
          setKeyword,
        });
        console.log(url_alt + ' ' + img_url_alt);
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
