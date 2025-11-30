import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

export interface Talent {
  name: string;
  japName: string;
  website_string: string;
  website_string_alt: string;
  series: string;
  special_sets: string[];
  special_keyword: string[];
  special_indicator: string[];
  character_image_url: string;
}

@Injectable({
  providedIn: 'root',
})
export class TalentService {
  private readonly apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getTalents(): Observable<Talent[]> {
    return this.http.get<Talent[]>(this.apiUrl);
  }

  getTalent(slug: string): Observable<Talent> {
    return this.http.get<Talent>(`${this.apiUrl}/${encodeURIComponent(slug)}`);
  }
}

