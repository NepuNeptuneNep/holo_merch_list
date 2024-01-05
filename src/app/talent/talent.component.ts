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
  talent: string = "";

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.talent = this.route.snapshot.paramMap.get('talent') ?? "";
  }
}
