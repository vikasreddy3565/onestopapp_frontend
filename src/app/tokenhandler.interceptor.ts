import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, Subject, of } from 'rxjs';
import { catchError, tap, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthenticationService } from './service/auth.service';
import { UtilityService } from './service/utility.service';

@Injectable()
export class TokenHandlerInterceptor implements HttpInterceptor {
  public jwtHelper: JwtHelperService;
  constructor(
    private auth: AuthenticationService,
    private router: Router,  private utilityService: UtilityService ) {
    this.jwtHelper = new JwtHelperService();
  }

  reLoginInProgress = false;
  refreshTokenInProgress = false;
  reLoggedInSource = new Subject<HttpEvent<any>>();
  refreshTokenSource = new Subject<HttpEvent<any>>();
  reLoggedIn$ = this.reLoggedInSource.asObservable();
  refreshToken$ = this.reLoggedInSource.asObservable();

  /**
   * refresh token -- handles parallel requests
   */
  private refreshToken() {
    if (this.refreshTokenInProgress) {
      return new Observable((observer) => {
        this.refreshToken$.subscribe(() => {
          observer.next();
          observer.complete();
        });
      });
    } else {
      this.refreshTokenInProgress = true;
      return this.auth.refreshToken().pipe(
        tap(() => {
          this.refreshTokenInProgress = false;
          this.refreshTokenSource.next();
        })
      );
    }
  }

  /**
   * adds bearer token and accept type
   * @param request incoming httprequest
   */
  private setHeaders(request: HttpRequest<any>) {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${localStorage.getItem('id_token')}`,
        Accept: `application/json`,
        'If-Modified-Since': 'Mon, 26 Jul 1997 05:00:00 GMT',
        'Cache-Control': 'no-cache',
        Pragma: 'no-cache',
      },
    });
  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    request = this.setHeaders(request);
    return next.handle(request).pipe(
      // Operation failed; error is an HttpErrorResponse
      catchError((error: HttpErrorResponse) => {
        if (+error.status === 401) {
          const refreshToken = localStorage.getItem('refresh_token');
          // we can try to relogin if refresh token is not expired yet
          if (refreshToken && !this.jwtHelper.isTokenExpired(refreshToken)) {
            // refresh token
            if (this.utilityService.isTokenRefreshValid(request.url)) {
              return this.refreshToken().pipe(
                switchMap(() => {
                  // this will have new token
                  request = this.setHeaders(request);
                  return next.handle(request);
                })
              );
            } else {
              return of(null);
            }
          } else {
            // even if refresh token is expired we do redirect to login -- login ourself
            this.router.navigate(['login']);
          }
        }
        throw error;
      })
    );
  }
}
