import { NgModule, ErrorHandler } from '@angular/core';
import { JsonpModule } from '@angular/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { EmptyViewComponent } from '../components/empty-view/empty-view';

import { HomePage } from '../pages/home/home';
import { AboutPage } from '../pages/about/about';
import { TravelGuidePage } from '../pages/travel-guide/travel-guide';
import { PlacesPage } from '../pages/places/places';
import { PlaceDetailPage } from '../pages/place-detail/place-detail';
import { WeatherPage } from '../pages/weather/weather';
import { NewsPage } from '../pages/news/news';
import { NewsDetailPage } from '../pages/news-detail/news-detail';
import { PageDetailPage } from '../pages/page-detail/page-detail';

import { WeatherService } from '../providers/weather-service';
import { WordPressService } from '../providers/wordpress-service';

@NgModule({
  declarations: [
    MyApp,
    EmptyViewComponent,
    HomePage,
    AboutPage,
    TravelGuidePage,
    PlacesPage,
    PlaceDetailPage,
    WeatherPage,
    NewsPage,
    NewsDetailPage,
    PageDetailPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    JsonpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    AboutPage,
    TravelGuidePage,
    PlacesPage,
    PlaceDetailPage,
    WeatherPage,
    NewsPage,
    NewsDetailPage,
    PageDetailPage
  ],
  providers: [{ provide: ErrorHandler, useClass: IonicErrorHandler }, WeatherService, WordPressService]
})
export class AppModule { }
