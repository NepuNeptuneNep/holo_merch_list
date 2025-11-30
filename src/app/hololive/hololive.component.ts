import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TalentService, Talent } from '../talents.service';
import { FormsModule } from '@angular/forms';
import { BehaviorSubject, combineLatest, Observable, map } from 'rxjs';

@Component({
  selector: 'app-hololive',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './hololive.component.html',
  styleUrl: './hololive.component.scss',
})
export class HololiveComponent {
  talent_list = new BehaviorSubject<TalentsWithPreviews[]>([]);
  char_image_url = '';
  talents: Talent[] = [];
  filter = new BehaviorSubject<string>('');

  filtered_talent_list: Observable<TalentsWithPreviews[]> =
    combineLatest([this.talent_list.asObservable(), this.filter.asObservable()]).pipe(
      map(([talents, filterString]) =>
        talents.filter(t =>
          t.talent_string.toLowerCase().trim().includes(filterString.toLowerCase().trim())
        )
      )
    );

  constructor(private talentService: TalentService) { }

  ngOnInit(): void {
    this.talentService.getTalents().subscribe(async talents => {
      this.talents = talents;

      const list: TalentsWithPreviews[] = [];

      for (const talent of this.talents) {
        const talent_string =
          talent.website_string ??
          talent.name.toLowerCase().replace(/\s+/g, '-');

        const talent_series = talent.series;
        const talent_name = talent.name;

        const preview_img = await this.getCharacterImage(
          talent_string,
          talent_series,
          talent_name
        );

        list.push({ talent_string, preview_img });
      }
      this.talent_list.next(list);
    });
  }

  getValue(event: Event): string {
    return (event.target as HTMLInputElement).value;
  }


  async fetchAndParse(url: string): Promise<Document> {
    const response = await fetch(url);
    const html = await response.text();
    const parser = new DOMParser();
    return parser.parseFromString(html, "text/html");
  }

  hololiveDoc: Document | null = null;
  holostarsDoc: Document | null = null;

  async getCharacterImage(
    talentUrl: string,
    talentSeries: string,
    talentName: string
  ): Promise<string> {
    if (talentSeries === "hololive") {
      if (!this.hololiveDoc) {
        this.hololiveDoc = await this.fetchAndParse("https://shop.geekjack.net/pages/hololive");
      }
    } else {
      if (!this.holostarsDoc) {
        this.holostarsDoc = await this.fetchAndParse("https://shop.geekjack.net/pages/holostars");
      }
    }

    const doc = talentSeries === "hololive" ? this.hololiveDoc! : this.holostarsDoc!;

    const anchor = doc.querySelector(`a[href*="${talentUrl}" i]`);
    const imageDiv =
      anchor?.querySelector(".CollectionItem__ImageWrapper") ??
      anchor?.querySelector('div[style*="background-image"]');

    const style = imageDiv?.getAttribute("style") ?? "";

    const match = style.match(/background-image:\s*url\((['"]?)(.*?)\1\)/i);
    let url = match?.[2];

    if (!url) {
      return `assets/characterImages/${talentName}.png`;
    }

    if (url.startsWith("//")) {
      url = "https:" + url;
    }
    return url;
  }
}

class TalentsWithPreviews {
  talent_string = '';
  preview_img = '';
}
