export class WeatherForecast {
  coord: Coord;
  weather: Weather[];
  base: string;
  main: Main;
  visibility: number;
  wind: Wind;
  clouds: Clouds;
  dt: number;
  sys: Sys;
  id: number;
  name: string;
  cod: number;
}

export class Coord {
  lon: number;
  lat: number;
}

export class Main {
  temp: number;
  pressure: number;
  humidity: number;
  // tslint:disable-next-line: variable-name
  temp_min: number;
  // tslint:disable-next-line: variable-name
  temp_max: number;
}

export class Wind {
  speed: number;
  deg: number;
}

export class Clouds {
  all: number;
}

export class Sys {
  type: number;
  id: number;
  message: number;
  country: string;
  sunrise: number;
  sunset: number;
}

export class Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}
