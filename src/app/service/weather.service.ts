import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WeatherForecast } from 'src/app/models/weather';
import { HttpTokenService } from './httptoken.service';

@Injectable()
export class WeatherService {
  constructor(
    private httpService: HttpTokenService,
    private http: HttpClient
  ) {}
  get(id: string): Observable<WeatherForecast> {
    return this.httpService.get(`weather/${id}`);
  }

  getIp(): Observable<any> {
    return this.http.get('http://api.ipify.org/?format=json');
  }
}
