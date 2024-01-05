import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { URL } from '../app.component';
import { CommonModule } from '@angular/common';
import { Talent, talents} from "../talents";
@Component({
  selector: "app-talent",
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './talent.component.html',
  styleUrl: './talent.component.scss'
})

export class TalentComponent implements OnInit {
  talent: Talent = talents?.find(i => i.website_string == this.route.snapshot.paramMap.get('talent')) ?? new Talent("Not found", []);
  sets: Set[] = [];
  noMerchFound: boolean = false;

  constructor(private route: ActivatedRoute) {}
  async ngOnInit() {
    await this.getAnniversaryCelebrations();
    await this.getBirthdayCelebrations();
    await this.getSpecialSets();
    console.log(this.sets);

    if(this.sets.length == 0)
    {
      this.noMerchFound = true;
    }
  }

  async getSpecialSets(): Promise<void> 
  {
  
    for (const setUrl in this.talent.special_sets)
    {
      const preview_img = await this.getPreviewImage(this.talent.special_sets[parseInt(setUrl)]);
      this.sets.push({url: this.talent.special_sets[parseInt(setUrl)], img_url: preview_img});
    }
  }

  async getBirthdayCelebrations(): Promise<void> {
    const celebrationType = 'birthday-celebration';


    for (let i = 2018; i <= 2024; i++)
    {
      const url = URL
      .replace('{{CHARACTER}}', this.talent.website_string)
      .replace('{{VAR1}}', celebrationType)
      .replace('{{VAR2}}', `${i}`);
    console.log(url);

    const img_url = await this.getPreviewImage(url);

    if(await this.checkUrl(url))
    {
      this.sets.push({url, img_url});
      console.log(url + " " + img_url);
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
  
      const url = URL
        .replace('{{CHARACTER}}', this.talent.website_string)
        .replace('{{VAR1}}', number)
        .replace('{{VAR2}}', celebrationType);
      console.log(url);

      const img_url = await this.getPreviewImage(url);
  
      if(await this.checkUrl(url))
      {
        this.sets.push({url, img_url});
        console.log(url + " " + img_url);
      }
    }
  }

  async getPreviewImage(url:string): Promise<string>
  {
    const response = await fetch(url);
    const html = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const img = doc.querySelector('img[alt*="set" i]');
    const src = img?.getAttribute("data-original-src");
    console.log(src);
    return "https:" + src; 
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
  url: string = "";
  img_url: string = "";
}