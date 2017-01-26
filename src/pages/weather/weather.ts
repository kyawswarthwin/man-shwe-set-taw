import { Component, Injector } from '@angular/core';
import { BasePage } from '../base/base';
import { WeatherService } from '../../providers/weather-service';

@Component({
  selector: 'page-weather',
  templateUrl: 'weather.html'
})
export class WeatherPage extends BasePage {

  private forecast: any;

  constructor(public injector: Injector,
    public weather: WeatherService) {
    super(injector);
  }

  ionViewDidLoad() {
    this.showLoadingView();
    this.getForecast(20.1713723, 94.87021559999994);
  }

  getForecast(latitude: number, longitude: number) {
    this.weather.forecast(latitude, longitude).then(data => {
      this.forecast = data;
      this.showContentView();
    }, error => {
      this.showErrorView();
    });
  }

}
