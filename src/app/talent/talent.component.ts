import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { URL } from '../app.component';
import { HttpClientModule} from '@angular/common/http';
import { HttpClient} from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: "app-talent",
  standalone: true,
  imports: [HttpClientModule, CommonModule],
  templateUrl: './talent.component.html',
  styleUrl: './talent.component.scss'
})

export class TalentComponent implements OnInit {
  talent: string = this.route.snapshot.paramMap.get('talent') ?? "";

  sets: Set[] = [];

  constructor(private route: ActivatedRoute, private http: HttpClient) {}
  async ngOnInit() {
    await this.getAnniversaryCelebrations();

    console.log(this.sets);
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
        .replace('{{CHARACTER}}', this.talent)
        .replace('{{NUMBER}}', number)
        .replace('{{CELEBRATIONTYPE}}', celebrationType);
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
    const img = doc.querySelector('img[alt*="Merch Complete Set"]');
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