import { Component, Injector } from '@angular/core';
import { Geolocation } from 'ionic-native';
import { BasePage } from '../base/base';
import { Place } from '../../providers/place';
import { PlaceDetailPage } from '../place-detail/place-detail';

@Component({
  selector: 'page-places',
  templateUrl: 'places.html'
})
export class PlacesPage extends BasePage {

  private params: any = {};
  private places: Place[];

  constructor(public injector: Injector) {
    super(injector);

    this.params.category = this.navParams.data;
  }

  ionViewDidLoad() {
    this.showLoadingView();
    this.doRefresh();
  }

  loadData() {
    Place.load(this.params).then(data => {
      this.places = this.places.concat(data);
      this.onRefreshComplete(data);
      if (this.places.length) {
        this.showContentView();
      } else {
        this.showEmptyView();
      }
    }, error => {
      this.onRefreshComplete();
      this.showErrorView();
    });
  }

  doInfinite(infiniteScroll: any) {
    this.infiniteScroll = infiniteScroll;
    this.params.page++;
    this.loadData();
  }

  doRefresh(refresher?: any) {
    this.refresher = refresher;

    this.params.page = 0;
    this.places = [];

    Geolocation.getCurrentPosition({ timeout: 10000, enableHighAccuracy: true }).then(data => {
      this.params.location = data.coords;
      this.loadData();
    }, error => {
      this.showErrorView();
      this.showToast('တည်နေရာရှာမရပါ');
    });
  }

  goToPlaceDetailPage(place: any) {
    this.navigateTo(PlaceDetailPage, place);
  }

}
