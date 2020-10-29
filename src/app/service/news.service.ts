import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class NewsService {
  constructor(private http: HttpClient) {}

//   async getNews() {
//     await fetch('https://news67.p.rapidapi.com/trending', {
//       method: 'GET',
//       headers: {
//         'x-rapidapi-host': 'news67.p.rapidapi.com',
//         'x-rapidapi-key': '1f6591bee5msh045cfe247127a14p12ca17jsnc61ddf79426c',
//       },
//     })
//       .then((response) => {
//         console.log(response);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }

  getNews(): Observable<any> {
      // const header = new HttpHeaders({ 'x-rapidapi-host': 'news67.p.rapidapi.com',
      // 'x-rapidapi-key': '1f6591bee5msh045cfe247127a14p12ca17jsnc61ddf79426c'});
      return this.http
      .get('http://newsapi.org/v2/everything?q=bitcoin&from=2020-09-16&sortBy=publishedAt&apiKey=efc79a42f4524ccc8b91dfad211ee220');
  }
}
