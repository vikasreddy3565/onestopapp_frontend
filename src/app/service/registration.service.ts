import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Countries } from 'src/app/models/countries';
import { RegisterUser } from 'src/app/models/registerUser';

import { HttpTokenService } from './httptoken.service';

@Injectable()
export class RegisterUserService {
  constructor(private httpservice: HttpTokenService) {}
  checkEmailExists(email: string): any {
    const url = 'User/CheckEmailAddress/' + email;
    return this.httpservice.get(url).pipe(map((res) => res));
  }
  checkCheckUserNameExists(userName: string) {
    const url = 'User/CheckUserNameExists/' + userName;
    return this.httpservice.get(url).pipe(map((res) => res));
  }
  createRegisterDesignee(registerDesignee: RegisterUser) {
    const url = 'User';
    return this.httpservice
      .post(url, JSON.stringify(registerDesignee))
      .pipe(map((res) => res));
  }
  forgotUserName(email: string) {
    const body = JSON.stringify({ email });
    const url = 'User/ForgotUserName/';
    return this.httpservice
      .post(url, body)
      .pipe(map((res) => res))
      .toPromise();
  }
  validateUserNameAndEmail(userName: string, email: string) {
    const body = JSON.stringify({ userName, email });
    const url = 'User/ValidateUserNameAndEmail/';
    return this.httpservice
      .post(url, body)
      .pipe(map((res) => res))
      .toPromise();
  }
  validateUserNameAndSecurityAnswer(userName: string, answer: string) {
    const body = JSON.stringify({ userName, answer });
    const url = 'User/ValidateUserSecurityAnswer/';
    return this.httpservice
      .post(url, body)
      .pipe(map((res) => res))
      .toPromise();
  }
  changePassword(userName: string, newPassword: string) {
    const body = JSON.stringify({ userName, Password: newPassword });
    const url = 'User/ChangePassword/';
    return this.httpservice
      .post(url, body)
      .pipe(map((res) => res))
      .toPromise();
  }

  getCountries() {
    const url = 'User/GetCountries';
    return this.httpservice.get(url).pipe(map((res) => res));
  }
}
