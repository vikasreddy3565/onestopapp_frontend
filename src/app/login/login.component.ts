import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { WeatherForecast } from 'src/models/weather';
import { AuthenticationService } from '../service/auth.service';
import { MovieService } from '../service/movie.service';
import { NewsService } from '../service/news.service';
import { WeatherService } from '../service/weather.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginFormGroup: FormGroup;
  data: WeatherForecast;
  sunrise: Date;
  sunset: Date;
  nowPlaying: Array<any> = [];
  moviesNowPlaying: Array<any> = [];
  news: any;
  genres: any;
  max = 10;
  min = 0;
  step = 1;
  value = 0;
  thumbLabel = true;
  tickInterval = 10;

  totalResults: any;
  constructor(
    private fb: FormBuilder,
    private weatherService: WeatherService,
    private movieService: MovieService,
    private newsService: NewsService,
    private authService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.loginFormGroup = this.initiateFormGroup();
    this.weatherService.getIp().subscribe((id: any) => {
      this.weatherService.get(id.ip).subscribe((dt: WeatherForecast) => {
        this.data = dt;
        this.sunrise = new Date(1000 * this.data.sys.sunrise);
        this.sunset = new Date(1000 * this.data.sys.sunset);
      });
    });
    this.newsService.getNews().subscribe((dt: any) => {
      this.news = dt;
    });
    this.authService.getCountries().subscribe((dt: any) => {
      const c = dt;
    });
    this.movieService.getGenres().subscribe((dt: any) => {
      const gen = dt;
    });
    this.movieService.getNowPlaying(1).subscribe((res) => {
      this.totalResults = res.total_results;
      this.nowPlaying = res.results;
      this.nowPlaying.forEach((np) => (np.isMovie = true));
      this.nowPlaying.forEach((np) => {
        const date = new Date(np.release_date);
        np.release_date = `${this.setMonth(
          date.getMonth()
        )} ${date.getDate()} ${date.getFullYear()}`;
        this.moviesNowPlaying.push(np);
      });
    });
  }

  setMonth(month: number) {
    switch (month) {
      case 1:
        return 'January';
      case 2:
        return 'February';
      case 3:
        return 'March';
      case 4:
        return 'April';
      case 5:
        return 'May';
      case 6:
        return 'June';
      case 7:
        return 'July';
      case 8:
        return 'August';
      case 9:
        return 'September';
      case 10:
        return 'October';
      case 11:
        return 'November';
      case 12:
        return 'December';
      default:
        break;
    }
  }

  initiateFormGroup() {
    const formGroup = this.fb.group({
      userName: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
    return formGroup;
  }

  login() {
    const controls = this.loginFormGroup.controls;
    Object.keys(controls).forEach((controlName) =>
      controls[controlName].markAsTouched()
    );
    if (this.loginFormGroup.valid) {
      this.authService.login(this.loginFormGroup.get('userName').value, this.loginFormGroup.get('password').value);
    }
  }
}
