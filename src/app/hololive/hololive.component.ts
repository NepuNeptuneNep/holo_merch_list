import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TalentService, TalentPreview } from '../talents.service';
import { FormsModule } from '@angular/forms';
import { BehaviorSubject, combineLatest, Observable, map } from 'rxjs';
import { KebabPipe } from '../kebabcase.pipe';

@Component({
  selector: 'app-hololive',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, KebabPipe],
  templateUrl: './hololive.component.html',
  styleUrl: './hololive.component.scss',
})

export class HololiveComponent {
  talents = new BehaviorSubject<TalentPreview[]>([]);
  filter = new BehaviorSubject<string>('');

  filtered_talent_list: Observable<TalentPreview[]> =
    combineLatest([this.talents.asObservable(), this.filter.asObservable()]).pipe(
      map(([talents, filterString]) =>
        talents.filter(t =>
          t.name.toLowerCase().trim().includes(filterString.toLowerCase().trim())
        )
      )
    );

  constructor(private talentService: TalentService) { }

  ngOnInit(): void {
    this.talentService.getTalents().subscribe(async talents => {
      this.talents.next(talents);
    });
  }

  getValue(event: Event): string {
    return (event.target as HTMLInputElement).value;
  }
}
