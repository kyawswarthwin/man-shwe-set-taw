import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class WeatherService {

  private baseUrl: string = 'http://api.openweathermap.org/data/2.5/';
  private appId: string = '3a8aaa69323915155bfeda8b50832777';

  constructor(public http: Http) { }

  forecast(cityId: string) {
    let url: string = this.baseUrl + 'forecast/daily';
    url += '?id=' + cityId;
    url += '&appid=' + this.appId;

    return new Promise((resolve, reject) => {
      this.http.get(url).map(res => res.json()).subscribe(data => resolve(data.list), error => reject(error));
    });
  }

}
