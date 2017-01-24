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
    this.getForecast('1309289');
  }

  getForecast(cityId: string) {
    this.weather.forecast(cityId).then(data => {
      this.forecast = data;
      // this.hideLoading();
    }, error => {
      // this.hideLoading();
      console.log(error);
    });
  }

}
