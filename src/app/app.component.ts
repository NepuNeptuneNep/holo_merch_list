import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'Mogus Live';
  currentImage = '';

  ngOnInit() {
    //this.mogusLive();
    this.currentImage = this.randomizeImage();
  }

  mogusLive() {
    for (let i = 0; i < 100; i++) {
      window.open(
        'https://play.google.com/store/apps/details?id=com.innersloth.spacemafia&hl=de&pli=1',
        '_blank'
      );
    }
  }

  randomizeImage() {
    const images = [
      'Watson.png',
      'Usada.png',
      'Shirakami.png',
      'Ookami.png',
      'Nekomata.png',
      'Moona.png',
      'Inugami.png',
      'Houshou.png',
      'Gawr.png',
      'Ayunda.png',
    ];
    const randomIndex = Math.floor(Math.random() * images.length);
    const randomImage = images[randomIndex];

    return '/assets/logos/' + randomImage;
  }
}

export const URL =
  'https://shop.geekjack.net/products/{{CHARACTER}}-{{VAR1}}-{{VAR2}}-merch-complete-set';
