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
  ngOnInit() {
  }
}

export const URL =
  'https://shop.geekjack.net/products/{{CHARACTER}}-{{VAR1}}-{{VAR2}}-merch-complete-set';
