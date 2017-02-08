import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { HomePage } from '../pages/home/home';
import Parse from 'parse';
import { PARSE_SDK } from '../providers/constants';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage = HomePage;

  constructor(platform: Platform) {
    Parse.initialize(PARSE_SDK.APP_ID, PARSE_SDK.JAVASCRIPT_KEY);
    Parse.serverURL = 'https://parseapi.back4app.com/';

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }
}
