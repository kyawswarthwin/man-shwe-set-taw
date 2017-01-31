import { Injectable } from '@angular/core';
import { Jsonp } from '@angular/http';
import 'rxjs/add/operator/map';
import { DARKSKY_API_KEY } from './constants';

@Injectable()
export class WeatherService {

  private baseUrl: string = 'https://api.darksky.net/forecast/';

  constructor(private jsonp: Jsonp) { }

  forecast(latitude: number, longitude: number): Promise<any> {
    let url = this.baseUrl + DARKSKY_API_KEY;
    url += '/' + latitude + ',' + longitude;
    url += '?exclude=minutely,hourly,alerts,flags&units=si';
    url += '&callback=JSONP_CALLBACK';

    return new Promise((resolve, reject) => {
      this.jsonp.get(url).map(res => res.json()).subscribe(data => resolve(data), error => reject(error));
    });
  }

}
