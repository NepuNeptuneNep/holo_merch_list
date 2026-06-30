import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}

export const URL =
  'https://shop.geekjack.net/products/{{CHARACTER}}-{{VAR1}}-{{VAR2}}-merch-complete-set';
