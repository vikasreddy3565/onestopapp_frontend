import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class NewsService {
  constructor(private http: HttpClient) { }

  getNews(): Observable<any> {
    const date = new Date();
    return this.http
      .get('http://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=efc79a42f4524ccc8b91dfad211ee220');
  }
}
