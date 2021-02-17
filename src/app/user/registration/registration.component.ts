import { Component, ElementRef, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { SelectItem, MessageService as ToastService } from 'primeng';
import { RegisterUserService } from 'src/app/service/registration.service';
import { RegisterUser } from 'src/models/registerUser';
import { RegularExpressions } from 'src/utils/regularexpressions';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerFormGroup: FormGroup;
  registerDesignee: RegisterUser;
  securityQuestionTypes: SelectItem[] = [];
  formSubmitted = false;
  passwordMatchFlg = false;
  passwordMatchMessage = '';
  emailMatchFlg = false;
  emailMatchMessage = '';
  userNameExistFlg = false;
  userNameExistMessage = '';
  emailExistFlg = false;
  emailExistMessage = '';
  confirmEmail: string;
  confirmPasword: string;
  disableSubmitButton = false;

  constructor(
    private fb: FormBuilder,
    private registerUserService: RegisterUserService,
    private router: Router,
    private el: ElementRef,
    private toastService: ToastService
  ) {}
  async ngOnInit() {
    this.registerDesignee = new RegisterUser();
    this.registerFormGroup = this.fb.group({
      firstName: new FormControl(this.registerDesignee.firstName, [
        Validators.required,
        Validators.maxLength(50),
        Validators.pattern(RegularExpressions.name),
        Validators.pattern(RegularExpressions.trim),
      ]),
      lastName: new FormControl(this.registerDesignee.lastName, [
        Validators.required,
        Validators.maxLength(50),
        Validators.pattern(RegularExpressions.name),
        Validators.pattern(RegularExpressions.trim),
      ]),
      email: new FormControl(this.registerDesignee.email, [
        Validators.required,
        Validators.pattern(RegularExpressions.email),
      ]),
      confirmEmail: new FormControl(this.registerDesignee.confirmEmail, [
        Validators.required,
        Validators.pattern(RegularExpressions.email),
      ]),
      userName: new FormControl(this.registerDesignee.userName, [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(21),
        Validators.pattern(RegularExpressions.trim),
      ]),
      password: new FormControl(this.registerDesignee.password, [
        Validators.required,
        Validators.pattern(RegularExpressions.password),
      ]),
      confirmPasword: new FormControl(this.registerDesignee.confirmPasword, [
        Validators.required,
      ]),
    });
  }

  onSubmit(designeeRegister) {
    this.formSubmitted = true;
    const formValidationFailed =
      this.userNameExistFlg ||
      this.emailExistFlg ||
      this.passwordMatchFlg ||
      this.emailMatchFlg;
    if (!this.registerFormGroup.valid || formValidationFailed) {
      this.el.nativeElement.querySelector('input.ng-invalid').focus();
      return; // Validation failed, exit from method.
    } else {
      this.disableSubmitButton = true; // disable submit button
      this.registerUserService
        .createRegisterDesignee(this.registerDesignee)
        .subscribe(
          (data) => {
            this.toastService.add({
              key: 'dms',
              severity: 'success',
              summary: 'User Registration',
              detail: 'Your account has been created successfully!',
            });
            setTimeout(() => {
              this.router.navigate(['//']);
            }, 1000);
          },
          (error) => {
            this.toastService.add({
              key: 'dms',
              severity: 'error',
              summary: 'Error Message',
              detail: 'Account creation unsuccessful, please try again.',
            });
            alert(error.json().message);
          }
        );
    }
    this.disableSubmitButton = false;
  }

  emailCompare() {
    if (
      this.confirmEmail !== undefined &&
      this.confirmEmail !== this.registerDesignee.email
    ) {
      this.emailMatchFlg = true;
      this.emailMatchMessage = 'The Confirm email does not match the email';
    } else {
      this.emailMatchFlg = false;
    }
  }

  passwordCompare() {
    if (
      this.confirmPasword !== undefined &&
      this.confirmPasword !== this.registerDesignee.password
    ) {
      this.passwordMatchFlg = true;
      this.passwordMatchMessage =
        'The Confirm Password does not match the Password';
    } else {
      this.passwordMatchFlg = false;
    }
  }

  checkUserNameExist(userName) {
    if (userName) {
      this.registerUserService
        .checkCheckUserNameExists(userName)
        .subscribe((data) => {
          this.userNameExistFlg = data;
          if (this.userNameExistFlg) {
            this.userNameExistMessage =
              'A duplicate User Name exists in DMS. Please enter a unique User Name.';
          }
        });
    }
  }

  checkEmailExist() {
    this.emailCompare();
    if (this.registerDesignee.email.toLowerCase().indexOf('faa.gov') === -1) {
      this.registerUserService
        .checkEmailExists(this.registerDesignee.email)
        .subscribe((data) => {
          this.emailExistFlg = data;
          if (this.emailExistFlg) {
            this.emailExistMessage =
              'A duplicate Email Address exists in DMS. Please enter a unique Email Address.';
          }
        });
    } else {
      this.emailExistFlg = true;
      this.emailExistMessage =
        'Please enter a Email Address that is not a faa.gov domain.';
    }
  }

  cancelRegistration() {
    this.router.navigate(['//']);
  }
}
