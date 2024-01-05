import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
//import { URL } from '../app.component';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-character',
  standalone: true,
  imports: [],
  templateUrl: './talent.component.html',
  styleUrl: './talent.component.scss'
})

export class TalentComponent implements OnInit {
  talent: string = this.route.snapshot.paramMap.get('talent') ?? "";
  img_source: string = "";
  url: string = "URL";

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  async ngOnInit() {
    await this.getAnniversaryCelebrations();
    await this.getPreviewImage(this.url);
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
  
      const url = "URL"
        .replace('{{CHARACTER}}', this.talent)
        .replace('{{NUMBER}}', number)
        .replace('{{CELEBRATIONTYPE}}', celebrationType);
      console.log(url);
  
      if(await this.checkUrl(url))
      {
        this.url = url;
      }
    }
  }

  async getPreviewImage(url:string)
  {
    const response = await fetch(url);
    const html = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const img = doc.querySelector('img[alt*="Merch Complete Set"]');
    const src = img?.getAttribute("data-original-src");
    console.log(src);
    this.img_source = "https:" + src; 
  }


  async checkUrl(url: string): Promise<boolean> {
    try {
      const response = await firstValueFrom(this.http.head(url));
      if (response instanceof HttpResponse)
      {      
        return response.ok;
      }
      return false;
    } 
    catch (error) {
      return false;
    }
  }
}

class Set {
  url: string = "";
  img_url: string = "";
}