import { Injectable, Inject } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { catchError, finalize } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { LoaderService } from './loader.service';
import { OSA_WEBAPI_LISTENER_URL } from '../models/export.model';

@Injectable()
export class HttpTokenService {
  httpRequestCount = 0;

  constructor(
    private http: HttpClient,
    private loaderService: LoaderService,
    @Inject(OSA_WEBAPI_LISTENER_URL) private WebApiListenerUrl: string
  ) {}

  public get(url: string, showSpinner = true): Observable<any> {
    this.showLoader(showSpinner);
    return this.http
      .get(this.getFullUrl(url), {
        responseType: 'json',
        headers: this.noCacheRequestOptions(),
      })
      .pipe(
        catchError(this.handleError), // then handle the error
        finalize(() => {
          this.hideLoader(showSpinner);
        })
      );
  }

  public post(url: string, body: any, showSpinner = true): Observable<any> {
    this.showLoader(showSpinner);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http
      .post(this.getFullUrl(url), body, { responseType: 'json', headers })
      .pipe(
        catchError(this.handleError), // then handle the error
        finalize(() => {
          this.hideLoader(showSpinner);
        })
      );
  }

  public upload(url: string, body: any, showSpinner = true): Observable<any> {
    this.showLoader(showSpinner);
    return this.http.post(this.getFullUrl(url), body).pipe(
      catchError(this.handleError), // then handle the error
      finalize(() => {
        this.hideLoader(showSpinner);
      })
    );
  }

  public put(url: string, body: any, showSpinner = true): Observable<any> {
    this.showLoader(showSpinner);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http
      .put(this.getFullUrl(url), body, { responseType: 'json', headers })
      .pipe(
        catchError(this.handleError), // then handle the error
        finalize(() => {
          this.hideLoader(showSpinner);
        })
      );
  }

  public delete(url: string, showSpinner = true): Observable<any> {
    this.showLoader(showSpinner);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http
      .delete(this.getFullUrl(url), { responseType: 'json', headers })
      .pipe(
        catchError(this.handleError), // then handle the error
        finalize(() => {
          this.hideLoader(showSpinner);
        })
      );
  }

  private getFullUrl(url: string): string {
    return this.WebApiListenerUrl + url;
  }

  private showLoader(showSpinner: boolean): void {
    this.httpRequestCount = this.httpRequestCount + 1;
    if (!showSpinner) {
      return;
    }
    this.loaderService.display(true);
  }

  private hideLoader(showSpinner: boolean): void {
    this.httpRequestCount = this.httpRequestCount - 1;
    if (!showSpinner) {
      return;
    }
    if (this.httpRequestCount <= 1) {
      this.loaderService.display(false);
    }
  }

  private handleError(error: HttpErrorResponse) {
    let msg = '';

    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
      if ('' + error.name === 'TimeoutError') {
        msg +=
          ' Timeout Error: ' + (error.error ? error.error.message : '') + '.';
      }
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.' + msg);
  }
  // Temporary fix until we create Token Interceptor for External APPliation and Use SHared HTTP TOken Service
  private noCacheRequestOptions(): HttpHeaders {
    return new HttpHeaders({
      'If-Modified-Since': 'Mon, 26 Jul 1997 05:00:00 GMT',
      'Cache-Control': 'no-cache',
      Pragma: 'no-cache',
    });
  }
}
