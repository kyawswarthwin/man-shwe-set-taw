import { Component, Injector } from '@angular/core';
import { BasePage } from '../base/base';
import { WeatherService } from '../../providers/weather-service';
import moment from 'moment';
import 'moment/locale/my';

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

  getMyanmarCalendarDay(time: number): string {
    if (!time) return null;
    moment.locale('my');
    return moment(time).calendar(null, {
      sameDay: '[ယနေ့]၊ MMM D',
      nextDay: '[မနက်ဖြန်]၊ MMM D',
      nextWeek: 'dddd၊ MMM D',
      lastDay: '[မနေ့က]၊ MMM D',
      lastWeek: '[ပြီးခဲ့သော] dddd၊ MMM D',
      sameElse: 'dddd၊ MMM D'
    });
  }

  getMyanmarTime(time: number): string {
    if (!time) return null;
    moment.locale('my');
    moment.updateLocale('my', {
      meridiem: function (hour, minute, isLower) {
        if (hour < 12) {
          return 'နံနက်';
        } else {
          return 'ညနေ';
        }
      }
    });
    return moment(time).format('h:mm A');
  }

  getMyanmarSummary(icon: string): string {
    switch (icon) {
      case 'clear-day':
      case 'clear-night':
        return 'သာယာ';
      case 'partly-cloudy-day':
      case 'partly-cloudy-night':
        return 'တိမ်\
အသင့်အတင့်';
      case 'cloudy':
        return 'တိမ်ထူ';
      case 'rain':
        return 'မိုးရွာ';
      case 'sleet':
        return 'မိုးနှင်းကျ';
      case 'snow':
        return 'နှင်းကျ';
      case 'wind':
        return 'လေတိုက်';
      case 'fog':
        return 'မြူထူ';
      default:
        return null;
    }
  }

}
