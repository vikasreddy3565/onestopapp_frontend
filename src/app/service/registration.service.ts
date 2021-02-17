import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { RegisterUser } from 'src/models/registerUser';

import { HttpTokenService } from './httptoken.service';

@Injectable()
export class RegisterUserService {
  constructor(private httpservice: HttpTokenService) {}
  checkEmailExists(email: string): any {
    const url = 'RegisterUser/CheckEmailAddress/' + email;
    return this.httpservice.get(url).pipe(map((res) => res));
  }
  checkCheckUserNameExists(userName: string) {
    const url = 'RegisterUser/CheckUserNameExists/' + userName;
    return this.httpservice.get(url).pipe(map((res) => res));
  }
  createRegisterDesignee(registerDesignee: RegisterUser) {
    const url = 'RegisterUser';
    return this.httpservice
      .post(url, JSON.stringify(registerDesignee))
      .pipe(map((res) => res));
  }
  forgotUserName(email: string) {
    const body = JSON.stringify({ email });
    const url = 'RegisterUser/ForgotUserName/';
    return this.httpservice
      .post(url, body)
      .pipe(map((res) => res))
      .toPromise();
  }
  validateUserNameAndEmail(userName: string, email: string) {
    const body = JSON.stringify({ userName, email });
    const url = 'RegisterUser/ValidateUserNameAndEmail/';
    return this.httpservice
      .post(url, body)
      .pipe(map((res) => res))
      .toPromise();
  }
  validateUserNameAndSecurityAnswer(userName: string, answer: string) {
    const body = JSON.stringify({ userName, answer });
    const url = 'RegisterUser/ValidateUserSecurityAnswer/';
    return this.httpservice
      .post(url, body)
      .pipe(map((res) => res))
      .toPromise();
  }
  changePassword(userName: string, newPassword: string) {
    const body = JSON.stringify({ userName, Password: newPassword });
    const url = 'RegisterUser/ChangePassword/';
    return this.httpservice
      .post(url, body)
      .pipe(map((res) => res))
      .toPromise();
  }
}
