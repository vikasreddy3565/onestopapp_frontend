import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialPrimengModule } from './material.primeng.module';
import { LoginModule } from './login/login.module';
import { HeaderModule } from './header/header.module';
import { MessageService } from 'primeng/api';
import { OSA_WEBAPI_LISTENER_URL } from './models/export.model';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from './service/auth.service';
import { UtilityService } from './service/utility.service';
import { LoaderService } from './service/loader.service';
import { WeatherService } from './service/weather.service';
import { HttpTokenService } from './service/httptoken.service';
import { MovieService } from './service/movie.service';
import { NewsService } from './service/news.service';
import { RegisterComponent } from './user/registration/registration.component';
import { PanelModule } from 'primeng';
import { RegisterUserService } from './service/registration.service';
import { UserModule } from './user/user.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    LoginModule,
    UserModule,
    HeaderModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialPrimengModule,
    PanelModule
  ],
  providers: [
    MessageService,
    AuthenticationService,
    HttpTokenService,
    UtilityService,
    LoaderService,
    WeatherService,
    MovieService,
    NewsService,
    RegisterUserService,
    { provide: OSA_WEBAPI_LISTENER_URL, useValue: environment.webApiEndPoint },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
