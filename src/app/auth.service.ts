import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../environments/environment';

export interface UserProfile {
  name: string;
  email?: string;
  sub: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly LOGIN_HINT_KEY = 'wasLoggedIn';
  private _ghostToken: string | null = null;

  private sessionTokenSubject = new BehaviorSubject<string | null>(null);
  private profileSubject = new BehaviorSubject<UserProfile | null>(null);

  sessionToken$ = this.sessionTokenSubject.asObservable();
  profile$ = this.profileSubject.asObservable();

  constructor() {
    const wasRedirected = this.checkForRedirectToken();

    const hint = localStorage.getItem(this.LOGIN_HINT_KEY) === 'true';

    if (!wasRedirected && !this._ghostToken && hint) {
      this.signInWithGoogle();
    }
  }

  getCurrentToken(): string | null {
    return this._ghostToken;
  }

  signInWithGoogle(): void {
    const isLocal = window.location.hostname === 'localhost';
    const clientId = isLocal ? 'holo-merch-dev' : 'holo-merch';

    localStorage.setItem(this.LOGIN_HINT_KEY, 'true');

    const targetUrl = `${environment.identityUrl}/auth/google/login?client_id=${clientId}`;
    window.location.href = targetUrl;
  }

  signOut(): void {
    this._ghostToken = null;
    this.profileSubject.next(null);
    this.sessionTokenSubject.next(null);
    localStorage.setItem(this.LOGIN_HINT_KEY, 'false');

    const isLocal = window.location.hostname === 'localhost';
    const clientId = isLocal ? 'holo-merch-dev' : 'holo-merch';

    const logoutUrl = `${environment.identityUrl}/auth/logout?client_id=${clientId}`;
    window.location.href = logoutUrl;
  }

  private checkForRedirectToken(): boolean {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');

    if (token) {
      this._ghostToken = token;
      this.sessionTokenSubject.next(token);

      const profile = this.decodeProfileFromToken(token);
      this.profileSubject.next(profile);

      window.history.replaceState({}, document.title, window.location.pathname);
      return true;
    }
    return false;
  }

  private decodeProfileFromToken(token: string): UserProfile | null {
    try {
      const parts = token.split('.');
      if (parts.length < 2) return null;
      const base64 = parts[1].replace(/-/g, '+').replace(/_/g, '/');
      const payload = JSON.parse(atob(base64));

      return {
        name: payload.name || payload.email || 'User',
        email: payload.email,
        sub: payload.sub
      };
    } catch (e) {
      console.error('JWT Decode failed', e);
      return null;
    }
  }
}