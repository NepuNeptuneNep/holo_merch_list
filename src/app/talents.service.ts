import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

export interface TalentPreview {
  name: string;
  character_image_url: string;
}

export interface TalentDetail {
  name: string;
  japanese_name: string;
  sets: Set[];
}

export interface Set{
  image_url: string,
  href: string,
  name: string
}

@Injectable({
  providedIn: 'root',
})
export class TalentService {
  private readonly apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getTalents(): Observable<TalentPreview[]> {
    return this.http.get<TalentPreview[]>(`${this.apiUrl}/Talent`);
  }

  getTalent(slug: string): Observable<TalentDetail> {
    return this.http.get<TalentDetail>(`${this.apiUrl}/Talent/${encodeURIComponent(slug)}`);
  }
}
