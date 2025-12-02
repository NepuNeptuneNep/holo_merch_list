import { ApplicationConfig, inject } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors, HttpInterceptorFn } from '@angular/common/http';
import { routes } from './app.routes';
import { AuthService } from './auth.service';
import { environment } from '../environments/environment';

const apiOrigin = (() => {
  try {
    const url = new URL(environment.apiUrl);
    url.pathname = url.pathname.replace(/\/Talent\/?$/, '');
    return url.origin;
  } catch {
    return null;
  }
})();

const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.getCurrentToken();

  const shouldAttach =
    !!token &&
    apiOrigin &&
    (() => {
      try {
        const requestUrl = new URL(req.url, window.location.origin);
        return requestUrl.origin === apiOrigin;
      } catch {
        return false;
      }
    })();

  if (!shouldAttach) {
    return next(req);
  }

  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });

  return next(authReq);
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor]))
  ],
};
