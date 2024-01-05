import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  constructor(private router: Router) { }
  title = 'holo-merch-list';
}

//export const URL = "https://shop.geekjack.net/products/{{CHARACTER}}-{{NUMBER}}-{{CELEBRATIONTYPE}}-merch-complete-set";

