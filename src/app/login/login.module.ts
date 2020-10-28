import { NgModule } from '@angular/core';
import { LoginComponent } from './login.component';

import { BrowserModule } from '@angular/platform-browser';
import { LoginRoutingModule } from './login-routing.module';
import { HeaderModule } from '../header/header.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialPrimengModule } from '../material.primeng.module';
@NgModule({
    imports: [
        ReactiveFormsModule,
        HeaderModule,
        LoginRoutingModule,
        BrowserModule,
        MaterialPrimengModule
    ],
    exports: [
        LoginComponent,

    ],
    declarations: [
        LoginComponent,
    ],
    providers: [],
})
export class LoginModule { }
