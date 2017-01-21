import { Component, Injector } from '@angular/core';
import { BasePage } from '../base/base';
import { AboutPage } from '../about/about';
import { HistoryPage } from '../history/history';
import { NewsPage } from '../news/news';
import { WeatherPage } from '../weather/weather';
import { TravelGuidePage } from '../travel-guide/travel-guide';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage extends BasePage {

  constructor(public injector: Injector) {
    super(injector);
  }

  goToAboutPage() {
    this.navigateTo(AboutPage);
  }

  goToHistoryPage() {
    this.navigateTo(HistoryPage);
  }

  goToNewsPage() {
    this.navigateTo(NewsPage);
  }

  goToWeatherPage() {
    this.navigateTo(WeatherPage);
  }

  goToTravelGuidePage() {
    this.navigateTo(TravelGuidePage);
  }

}
