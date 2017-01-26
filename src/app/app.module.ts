import { NgModule, ErrorHandler } from '@angular/core';
import { JsonpModule } from '@angular/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { EmptyViewComponent } from '../components/empty-view/empty-view';

import { HomePage } from '../pages/home/home';
import { AboutPage } from '../pages/about/about';
import { HistoryPage } from '../pages/history/history';
import { NewsPage } from '../pages/news/news';
import { NewsDetailPage } from '../pages/news-detail/news-detail';
import { WeatherPage } from '../pages/weather/weather';
import { TravelGuidePage } from '../pages/travel-guide/travel-guide';
import { PlacesPage } from '../pages/places/places';
import { PlaceDetailPage } from '../pages/place-detail/place-detail';

import { BlogService } from '../providers/blog-service';
import { WeatherService } from '../providers/weather-service';

@NgModule({
  declarations: [
    MyApp,
    EmptyViewComponent,
    HomePage,
    AboutPage,
    HistoryPage,
    NewsPage,
    NewsDetailPage,
    WeatherPage,
    TravelGuidePage,
    PlacesPage,
    PlaceDetailPage
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
    HistoryPage,
    NewsPage,
    NewsDetailPage,
    WeatherPage,
    TravelGuidePage,
    PlacesPage,
    PlaceDetailPage
  ],
  providers: [{ provide: ErrorHandler, useClass: IonicErrorHandler }, BlogService, WeatherService]
})
export class AppModule { }
