import { Component, OnInit } from '@angular/core';
import {  CommonModule } from '@angular/common';
import { RouterModule} from '@angular/router';
import { talents} from '../talents';
@Component({
  selector: 'app-talent-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './talent-list.component.html',
  styleUrl: './talent-list.component.scss'
})

export class TalentListComponent implements OnInit {
talent_list: TalentsWithPreviews[] = [];
char_image_url = "";

 async ngOnInit(): Promise<void> {

  for (const talent in talents)
  {
    const talent_string = talents[talent].website_string;
    const preview_img = await this.getCharacterImage(talent_string);
    this.talent_list.push({talent_string, preview_img});
  }
}

  async getCharacterImage(talent: string): Promise<string>
  {
    const response = await fetch("https://shop.geekjack.net/pages/hololive");
    const html = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const div = doc.querySelector('a[href*="' + talent +'" i] > div');
    const src = div?.getAttribute("style")?.slice(22, -2);
    console.log("https:"+src);
    return "https:" + src?.replace("1x1", "1500x1500");
  }
}


class TalentsWithPreviews {
  talent_string = ""
  preview_img = ""
}