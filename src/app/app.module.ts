import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AboutPage } from '../pages/about/about';
import { HistoryPage } from '../pages/history/history';
import { NewsPage } from '../pages/news/news';
import { NewsDetailsPage } from '../pages/news-details/news-details';
import { WeatherPage } from '../pages/weather/weather';
import { TravelGuidePage } from '../pages/travel-guide/travel-guide';
import { PlacesPage } from '../pages/places/places';
import { BlogService } from '../providers/blog-service';
import { WeatherService } from '../providers/weather-service';
import { TemperaturePipe } from '../pipes/temperature-pipe';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    AboutPage,
    HistoryPage,
    NewsPage,
    NewsDetailsPage,
    WeatherPage,
    TravelGuidePage,
    PlacesPage,
    TemperaturePipe
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    AboutPage,
    HistoryPage,
    NewsPage,
    NewsDetailsPage,
    WeatherPage,
    TravelGuidePage,
    PlacesPage
  ],
  providers: [{ provide: ErrorHandler, useClass: IonicErrorHandler }, BlogService, WeatherService]
})
export class AppModule { }
