import { Injectable } from '@angular/core';
import { HttpBackend, HttpClient } from '@angular/common/http';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { environment } from '../environments/environment';

export interface UserProfile {
  name: string;
  email?: string;
  sub: string;
}

interface TokenExchangeResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly LOGIN_HINT_KEY = 'wasLoggedIn';
  private readonly PKCE_VERIFIER_KEY = 'pkce_verifier';
  private readonly PKCE_STATE_KEY = 'pkce_state';
  private readonly LOGIN_IN_PROGRESS_KEY = 'login_in_progress';
  private _ghostToken: string | null = null;
  private http: HttpClient;

  private sessionTokenSubject = new BehaviorSubject<string | null>(null);
  private profileSubject = new BehaviorSubject<UserProfile | null>(null);

  sessionToken$ = this.sessionTokenSubject.asObservable();
  profile$ = this.profileSubject.asObservable();

  constructor(private httpBackend: HttpBackend) {
    this.http = new HttpClient(this.httpBackend);
    void this.handleRedirect();
  }

  getCurrentToken(): string | null {
    return this._ghostToken;
  }

  signInWithGoogle(): void {
    void this.startLogin();
  }

  signOut(): void {
    this.clearSession();
    localStorage.setItem(this.LOGIN_HINT_KEY, 'false');

    const clientId = this.getClientId();
    const logoutUrl = `${environment.identityUrl}/auth/logout?client_id=${encodeURIComponent(clientId)}`;
    window.location.href = logoutUrl;
  }

  isLoginInProgress(): boolean {
    const raw = sessionStorage.getItem(this.LOGIN_IN_PROGRESS_KEY);
    if (!raw) {
      return false;
    }
    const startedAt = Number(raw);
    if (!Number.isFinite(startedAt)) {
      sessionStorage.removeItem(this.LOGIN_IN_PROGRESS_KEY);
      return false;
    }
    if (Date.now() - startedAt > 2 * 60 * 1000) {
      sessionStorage.removeItem(this.LOGIN_IN_PROGRESS_KEY);
      return false;
    }
    return true;
  }

  private async handleRedirect(): Promise<void> {
    const handled = await this.checkForRedirectCode();
    const hint = localStorage.getItem(this.LOGIN_HINT_KEY) === 'true';

    if (!handled && !this._ghostToken && hint) {
      this.signInWithGoogle();
    }
  }

  private async checkForRedirectCode(): Promise<boolean> {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');
    const error = params.get('error');

    if (!code && !error) {
      return false;
    }

    const storedState = sessionStorage.getItem(this.PKCE_STATE_KEY);
    const returnedState = params.get('state');
    const verifier = sessionStorage.getItem(this.PKCE_VERIFIER_KEY);

    sessionStorage.removeItem(this.PKCE_STATE_KEY);
    sessionStorage.removeItem(this.PKCE_VERIFIER_KEY);
    sessionStorage.removeItem(this.LOGIN_IN_PROGRESS_KEY);

    if (!code || !returnedState || !storedState || returnedState !== storedState || !verifier) {
      this.clearSession();
      console.error('OAuth state verification failed', {
        hasCode: !!code,
        hasReturnedState: !!returnedState,
        hasStoredState: !!storedState,
        stateMatches: returnedState === storedState,
        hasVerifier: !!verifier
      });
      window.history.replaceState({}, document.title, window.location.pathname);
      return true;
    }

    try {
      const token = await this.exchangeCodeForToken(
        code,
        verifier,
        this.getClientId(),
        this.getRedirectUri()
      );
      this._ghostToken = token;
      this.sessionTokenSubject.next(token);
      this.profileSubject.next(this.decodeProfileFromToken(token));
      localStorage.setItem(this.LOGIN_HINT_KEY, 'true');
      console.info('Token exchange succeeded');
    } catch (err) {
      this.clearSession();
      console.error('Token exchange failed', err);
    } finally {
      window.history.replaceState({}, document.title, window.location.pathname);
    }

    return true;
  }

  private async exchangeCodeForToken(
    code: string,
    verifier: string,
    clientId: string,
    redirectUri: string
  ): Promise<string> {
    const payload = {
      code,
      client_id: clientId,
      redirect_uri: redirectUri,
      code_verifier: verifier
    };

    const response = await firstValueFrom(
      this.http.post<TokenExchangeResponse>(`${environment.identityUrl}/auth/token`, payload)
    );
    return response.access_token;
  }

  private async startLogin(): Promise<void> {
    if (this.isLoginInProgress()) {
      return;
    }

    try {
      const clientId = this.getClientId();
      const redirectUri = this.getRedirectUri();
      const state = this.generateRandomString(16);
      const verifier = this.generateRandomString(32);
      const challenge = await this.createPkceChallenge(verifier);

    sessionStorage.setItem(this.PKCE_STATE_KEY, state);
    sessionStorage.setItem(this.PKCE_VERIFIER_KEY, verifier);
    sessionStorage.setItem(this.LOGIN_IN_PROGRESS_KEY, String(Date.now()));
    localStorage.setItem(this.LOGIN_HINT_KEY, 'true');

      const targetUrl = `${environment.identityUrl}/auth/google/login` +
        `?client_id=${encodeURIComponent(clientId)}` +
        `&redirect_uri=${encodeURIComponent(redirectUri)}` +
        `&response_type=code` +
        `&code_challenge_method=S256` +
        `&code_challenge=${encodeURIComponent(challenge)}` +
        `&app_state=${encodeURIComponent(state)}`;
      window.location.href = targetUrl;
    } catch (err) {
      sessionStorage.removeItem(this.LOGIN_IN_PROGRESS_KEY);
      console.error('Login redirect failed', err);
    }
  }

  private clearSession(): void {
    this._ghostToken = null;
    this.sessionTokenSubject.next(null);
    this.profileSubject.next(null);
  }

  private getClientId(): string {
    return window.location.hostname === 'localhost' ? 'holo-merch-dev' : 'holo-merch';
  }

  private getRedirectUri(): string {
    return `${window.location.origin}/`;
  }

  private async createPkceChallenge(verifier: string): Promise<string> {
    const data = new TextEncoder().encode(verifier);
    const digest = await crypto.subtle.digest('SHA-256', data);
    return this.base64UrlEncode(new Uint8Array(digest));
  }

  private generateRandomString(length: number): string {
    const bytes = new Uint8Array(length);
    crypto.getRandomValues(bytes);
    return this.base64UrlEncode(bytes);
  }

  private base64UrlEncode(bytes: Uint8Array): string {
    let binary = '';
    bytes.forEach((value) => {
      binary += String.fromCharCode(value);
    });
    return btoa(binary)
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/g, '');
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
