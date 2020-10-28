import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, tap, catchError } from 'rxjs/operators';
import { environment } from './../../environments/environment';
import { HttpTokenService } from './httptoken.service';
import { Router } from '@angular/router';
import { JwtParameters, AuthResult, User } from '../models/export.model';

@Injectable()
export class AuthenticationService {
  constructor(
    private httpservice: HttpTokenService,
    private router: Router,
    private http: HttpClient
  ) {}

  login(username: string, password: string) {
    const jwtParams: JwtParameters = new JwtParameters();
    const authResult: AuthResult = new AuthResult();
    jwtParams.username = username;
    jwtParams.password = password;
    jwtParams.clientSecret = '';
    jwtParams.grantType = 'password';
    jwtParams.refreshToken = null;
    const body = JSON.stringify(jwtParams);
    const url = environment.webApiEndPoint + 'token/authenticate';
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http
      .post(url, body, { headers })
      .pipe(map((response) => response as any))
      .toPromise()
      .then((r) => {
        const data = JSON.parse(r.data);
        if (r.code === '1000') {
          sessionStorage.setItem(
            'currentUser',
            JSON.stringify(data.userDetails)
          );
          localStorage.setItem('id_token', data.access_token);
          localStorage.setItem('refresh_token', data.refresh_token);
          authResult.isAuthenticated = true;
          authResult.userStatusId = data.userDetails.userStatusId;
        } else {
          authResult.message = 'Password is wrong';
          authResult.isAuthenticated = false;
        }

        return authResult;
      })
      .catch((error) => {
        console.log(error);
        authResult.isAuthenticated = false;
        authResult.message = 'Log in failed';
        return authResult;
      });
  }

  refreshToken() {
    const jwtParams: JwtParameters = new JwtParameters();
    jwtParams.clientSecret = '';
    jwtParams.grantType = 'refresh_token';
    jwtParams.refreshToken = localStorage.getItem('refresh_token');
    const url = environment.webApiEndPoint + 'token/authenticate';
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(url, JSON.stringify(jwtParams), { headers }).pipe(
      tap((tokenData: any) => {
        const data = JSON.parse(tokenData.data);
        localStorage.setItem('id_token', data.access_token);
        localStorage.setItem('refresh_token', data.refresh_token);
        console.log(tokenData.message);
      })
    );
  }

  verifyUserWithPassword(password: string) {
    const user: User = new User();
    const authResult: AuthResult = new AuthResult();
    user.userName = this.authenticatedUser().userName;
    user.password = password;
    const body = JSON.stringify(user);
    const url = 'Users/AuthenticateUser/';
    return this.httpservice.post(url, body).pipe(
      map((data: any) => {
        if (data.result === 1000) {
          authResult.isAuthenticated = true;
        } else if (data.result === 3000) {
          authResult.message =
            'Account is locked, please contact system administrtor.';
          authResult.isAuthenticated = false;
        } else {
          authResult.message = 'Password is wrong';
          authResult.isAuthenticated = false;
        }
        return authResult;
      }),
      catchError((error) => {
        authResult.isAuthenticated = false;
        authResult.message = 'Log in failed';
        // return authResult;
        throw error;
      })
    );
  }

  changePassword(newPassword: string) {
    const userId = this.authenticatedUser().userId;
    const body = JSON.stringify({ UserId: userId, NewPassword: newPassword });
    return this.httpservice
      .post('Users/ChangePassword/', body)
      .pipe(map((response) => response))
      .toPromise();
  }

  isUserAuthenticated(): boolean {
    const user = sessionStorage.getItem('currentUser');
    if (user == null) {
      return false;
    }
    return true;
  }

  authenticatedUser(): any {
    const user = sessionStorage.getItem('currentUser');
    if (user == null) {
      this.router.navigate(['login']);
    }
    return JSON.parse(user);
  }


  logout() {
    // remove user from local storage to log user out
    sessionStorage.removeItem('currentUser');
    sessionStorage.removeItem('legacyAuth');
    localStorage.removeItem('id_token');
    localStorage.removeItem('refresh_token');
    this.router.navigate(['//login']);
  }

}
