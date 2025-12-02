import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../environments/environment';

export interface UserProfile {
  name: string;
  email?: string;
  pictureUrl?: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly apiUrl = environment.apiUrl;
  private readonly tokenStorageKey = 'sessionToken';

  private sessionTokenSubject = new BehaviorSubject<string | null>(this.readStoredToken());
  private profileSubject = new BehaviorSubject<UserProfile | null>(this.decodeProfileFromToken(this.sessionTokenSubject.value ?? ''));

  sessionToken$ = this.sessionTokenSubject.asObservable();
  profile$ = this.profileSubject.asObservable();

  getCurrentToken(): string | null {
    return this.sessionTokenSubject.value;
  }

  signOut(): void {
    try {
      sessionStorage.removeItem(this.tokenStorageKey);
    } catch {
      // ignore storage failures
    }
    this.sessionTokenSubject.next(null);
    this.profileSubject.next(null);
  }

  /**
   * Opens backend Google OAuth in a popup. Backend should postMessage
   * { sessionToken, profile? } or { error: 'forbidden' } to window.opener.
   */
  signInWithGooglePopup(): Observable<void> {
    return new Observable<void>((observer) => {
      const authBase = this.getApiBase();
      const authOrigin = this.safeOrigin(authBase);
      const popupUrl = `${authBase}/User/auth/google/start`;

      const popup = window.open(
        popupUrl,
        'google-signin',
        'width=500,height=640,menubar=no,toolbar=no'
      );

      if (!popup) {
        observer.error(new Error('Popup blocked. Allow popups and try again.'));
        return;
      }

      const cleanup = () => {
        window.removeEventListener('message', onMessage);
        clearInterval(pollTimer);
      };

      const onMessage = (event: MessageEvent) => {
        if (!authOrigin || event.origin !== authOrigin) {
          return;
        }

        const data = event.data || {};
        if (data.sessionToken) {
          const profile = data.profile as UserProfile | undefined;
          this.persistTokenAndProfile(data.sessionToken, profile);
          cleanup();
          observer.next();
          observer.complete();
          if (!popup.closed) {
            popup.close();
          }
        } else if (data.error === 'forbidden') {
          cleanup();
          observer.error({ status: 403, message: 'Forbidden Google account' });
          if (!popup.closed) {
            popup.close();
          }
        } else if (data.error) {
          cleanup();
          observer.error(new Error(data.error));
          if (!popup.closed) {
            popup.close();
          }
        }
      };

      window.addEventListener('message', onMessage);

      const pollTimer = window.setInterval(() => {
        if (popup.closed) {
          cleanup();
          observer.error(new Error('Popup closed before completing sign-in.'));
        }
      }, 600);

      return () => cleanup();
    });
  }

  private persistTokenAndProfile(token: string, profile?: UserProfile) {
    // Store token in sessionStorage (clears on tab close) instead of localStorage
    try {
      sessionStorage.setItem(this.tokenStorageKey, token);
    } catch {
      // ignore storage failures
    }
    this.sessionTokenSubject.next(token);

    const resolvedProfile = profile ?? this.decodeProfileFromToken(token);
    // Keep profile only in memory to reduce exposure
    this.profileSubject.next(resolvedProfile ?? null);
  }

  private decodeProfileFromToken(token: string): UserProfile | null {
    try {
      const parts = token.split('.');
      if (parts.length < 2) return null;
      const payload = JSON.parse(atob(parts[1].replace(/-/g, '+').replace(/_/g, '/')));
      return {
        name: payload.name || payload.email || '',
        email: payload.email,
        pictureUrl: payload.picture,
      };
    } catch {
      return null;
    }
  }

  private readStoredToken(): string | null {
    try {
      return sessionStorage.getItem(this.tokenStorageKey);
    } catch {
      return null;
    }
  }

  private getApiBase(): string {
    try {
      const url = new URL(this.apiUrl);
      // Strip trailing /Talent if present
      url.pathname = url.pathname.replace(/\/Talent\/?$/, '');
      return url.toString().replace(/\/$/, '');
    } catch {
      return this.apiUrl.replace(/\/Talent\/?$/, '');
    }
  }

  private safeOrigin(urlString: string): string | null {
    try {
      return new URL(urlString).origin;
    } catch {
      return null;
    }
  }
}
