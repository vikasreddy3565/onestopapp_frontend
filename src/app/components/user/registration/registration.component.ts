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
import { WeatherService } from 'src/app/service/weather.service';
import { Countries } from 'src/app/models/countries';
import { RegisterUser } from 'src/app/models/registerUser';
import { RegularExpressions } from 'src/utils/regularexpressions';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerFormGroup: FormGroup;
  registerDesignee: RegisterUser;
  countries: SelectItem[] = [];
  formSubmitted = false;
  passwordMatchFlg = false;
  passwordMatchMessage = '';
  emailMatchFlg = false;
  emailMatchMessage = '';
  userNameExistFlg = false;
  userNameExistMessage = '';
  emailExistFlg = false;
  emailExistMessage = '';
  disableSubmitButton = false;
  hide = true;

  constructor(
    private fb: FormBuilder,
    private registerUserService: RegisterUserService,
    private router: Router,
    private el: ElementRef,
    private toastService: ToastService,
  ) { }
  async ngOnInit() {
    this.buildForm();
    this.registerUserService.getCountries().subscribe((dt: Countries[]) => {
      const data = dt;
      if (dt.length > 0) {
        const list: SelectItem[] = [];
        list.push({ label: '- Select -', value: null });
        dt.forEach((e: Countries) => {
          list.push({ label: e.name, value: e.id });
        });
        this.countries = list;
      }
    });
  }

  buildForm() {
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
      userName: new FormControl(this.registerDesignee.userName = '', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(30),
        Validators.pattern(RegularExpressions.trim),
      ]),
      password: new FormControl(this.registerDesignee.password = '', [
        Validators.required,
        Validators.pattern(RegularExpressions.password),
      ]),
      confirmPasword: new FormControl(this.registerDesignee.confirmPasword, [
        Validators.required,
      ]),
      countryId: new FormControl(this.registerDesignee.countryId, [
        Validators.required,
      ]),
    });
  }

  onSubmit() {
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
      this.bindModel(this.registerFormGroup);
      this.registerUserService
        .createRegisterDesignee(this.registerDesignee)
        .subscribe(
          () => {
            this.toastService.add({
              key: 'onestop',
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
              key: 'onestop',
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

  bindModel(form: FormGroup) {
    this.registerDesignee.firstName = form.get('firstName').value;
    this.registerDesignee.lastName = form.get('lastName').value;
    this.registerDesignee.email = form.get('email').value;
    this.registerDesignee.userName = form.get('userName').value;
    this.registerDesignee.password = form.get('password').value;
    this.registerDesignee.countryId = form.get('countryId').value;
  }

  emailCompare() {
    if (
      this.registerFormGroup.get('email').value !== undefined &&
      this.registerFormGroup.get('email').value !== this.registerFormGroup.get('confirmEmail').value
    ) {
      this.emailMatchFlg = true;
      this.emailMatchMessage = 'The Confirm email does not match the email';
    } else {
      this.emailMatchFlg = false;
    }
  }

  passwordCompare() {
    if (this.registerFormGroup.get('confirmPasword').value !== undefined &&
      this.registerFormGroup.get('confirmPasword').value !== this.registerFormGroup.get('password').value
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
              'A duplicate User Name exists in One Stop. Please enter a unique User Name.';
          }
        });
    }
  }

  checkEmailExist() {
    this.emailCompare();
    this.registerUserService
      .checkEmailExists(this.registerDesignee.email)
      .subscribe((data) => {
        this.emailExistFlg = data;
        if (this.emailExistFlg) {
          this.emailExistMessage =
            'A duplicate Email Address exists in One Stop. Please enter a unique Email Address.';
        }
      });
  }

  cancelRegistration() {
    this.router.navigate(['//']);
  }
}
