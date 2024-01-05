import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

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
  url: string = "https://shop.geekjack.net/products/tokoyami-towa-2nd-anniversary-celebration-merch-complete-set";
  constructor(private route: ActivatedRoute) {}

  async ngOnInit() {
    this.getPreviewImage(this.url);
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
}
