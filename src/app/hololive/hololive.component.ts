import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { talents } from '../talents.service';

@Component({
  selector: 'app-hololive',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './hololive.component.html',
  styleUrl: './hololive.component.scss',
})
export class HololiveComponent {
  talent_list: TalentsWithPreviews[] = [];
  char_image_url = '';

  async ngOnInit(): Promise<void> {
    for (const talent in talents) {
      const talent_string = talents[talent].website_string;
      const talent_series = talents[talent].series;
      const talent_name = talents[talent].name;
      const preview_img = await this.getCharacterImage(
        talent_string,
        talent_series,
        talent_name
      );
      this.talent_list.push({ talent_string, preview_img });
    }
  }

  async getCharacterImage(
    talentUrl: string,
    talentSeries: string,
    talentName: string
  ): Promise<string> {
    let response;
    if (talentSeries == 'hololive') {
      response = await fetch('https://shop.geekjack.net/pages/hololive');
    } else {
      response = await fetch('https://shop.geekjack.net/pages/holostars');
    }
    const html = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const div = doc.querySelector('a[href*="' + talentUrl + '" i] > div');
    const src = div?.getAttribute('style')?.slice(22, -2);
    if (!src) {
      return 'assets/characterImages/' + talentName + '.png';
    }
    console.log('https:' + src);
    return 'https:' + src?.replace('1x1', '1500x1500');
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

class TalentsWithPreviews {
  talent_string = '';
  preview_img = '';
}
