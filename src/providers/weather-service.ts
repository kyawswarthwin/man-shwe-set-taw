import { Injectable } from '@angular/core';
import { Jsonp } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class WeatherService {

  private baseUrl: string = 'https://api.darksky.net/forecast/';
  private apiKey: string = 'cc4a7f6a9045cbeeb51cc4ada47be9ab';

  constructor(public jsonp: Jsonp) { }

  forecast(latitude: number, longitude: number): Promise<any> {
    let url = this.baseUrl + this.apiKey;
    url += '/' + latitude + ',' + longitude;
    url += '?exclude=minutely,hourly,alerts,flags&units=si';
    url += '&callback=JSONP_CALLBACK';

    return new Promise((resolve, reject) => {
      this.jsonp.get(url).map(res => res.json()).subscribe(data => resolve(data), error => reject(error));
    });
  }

}
