import { Component, Injector } from '@angular/core';
import { Geolocation } from 'ionic-native';
import { BasePage } from '../base/base';
import { Place } from '../../providers/place';

@Component({
  selector: 'page-places',
  templateUrl: 'places.html'
})
export class PlacesPage extends BasePage {

  private params: any = {};
  private places: Place[] = [];

  constructor(public injector: Injector) {
    super(injector);

    this.params.category = this.navParams.data;
  }

  ionViewDidLoad() {
    this.showLoading();
    this.doRefresh();
  }

  loadData() {
    Place.load(this.params).then(data => {
      this.places = this.places.concat(data);
      this.hideLoading();
      this.onRefreshComplete(data);
    }, error => {
      this.hideLoading();
      this.onRefreshComplete();
      console.log(error);
    });
  }

  doInfinite(infiniteScroll: any) {
    this.infiniteScroll = infiniteScroll;
    this.params.page++;
    this.loadData();
  }

  doRefresh(refresher?: any) {
    this.refresher = refresher;

    this.places = [];
    this.params.page = 0;

    Geolocation.getCurrentPosition().then(data => {
      this.params.location = data.coords;
      this.loadData();
    }, error => {
      this.hideLoading();
      this.showToast('Location Unavailable');
    });
  }

}
