import { Component, Injector } from '@angular/core';
import { Platform } from 'ionic-angular';
import { LocationAccuracy, Diagnostic } from 'ionic-native';
import { BasePage } from '../base/base';
import { Category } from '../../providers/category';
import { PlacesPage } from '../places/places';

@Component({
  selector: 'page-travel-guide',
  templateUrl: 'travel-guide.html'
})
export class TravelGuidePage extends BasePage {

  private categories: Category[];

  constructor(public injector: Injector,
    public platform: Platform) {
    super(injector);

    if (platform.is('cordova')) {
      LocationAccuracy.canRequest().then((canRequest: boolean) => {
        if (canRequest) {
          LocationAccuracy.request(LocationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(() => {
            console.log('Request Successful');
          }, error => {
            if (error && error.code !== LocationAccuracy.ERROR_USER_DISAGREED) {
              this.showConfirm("Failed to automatically set Location Mode to 'High Accuracy'. Would you like to switch to the Location Settings page and do this manually?").then(() => Diagnostic.switchToLocationSettings());
            }
          });
        }
      });
    }
  }

  ionViewDidLoad() {
    this.showLoading();
    this.loadData();
  }

  loadData() {
    Category.load().then(data => {
      this.categories = data;
      this.hideLoading();
    }, error => {
      this.hideLoading();
      console.log(error);
    });
  }

  goToPlacesPage(category) {
    this.navigateTo(PlacesPage, category);
  }

}
