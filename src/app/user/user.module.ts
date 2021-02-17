import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HeaderModule } from '../header/header.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialPrimengModule } from '../material.primeng.module';
import { UserRoutingModule } from './user-routing.module';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { ForgotusernameComponent } from './forgotusername/forgotusername.component';
import { RegisterComponent } from './registration/registration.component';
@NgModule({
    imports: [
        ReactiveFormsModule,
        HeaderModule,
        UserRoutingModule,
        BrowserModule,
        MaterialPrimengModule
    ],
    exports: [
        RegisterComponent,
        ForgotpasswordComponent,
        ForgotusernameComponent,

    ],
    declarations: [
        RegisterComponent,
        ForgotpasswordComponent,
        ForgotusernameComponent,
    ],
    providers: [],
})
export class UserModule { }
