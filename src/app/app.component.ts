import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { HomePage } from '../pages/home/home';
import Parse from 'parse';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage = HomePage;

  constructor(platform: Platform) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });

    Parse.initialize('UFD7CCSMBhjR6XaE05mIk5x7CzNC1IUqhi4jJK0m', 'bhW9MqveU4Niw2EhaXJUValhRNYy1EO7xjgQ5fPQ');
    Parse.serverURL = 'https://parseapi.back4app.com/';
  }
}
