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

  private params: any = {};
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
              this.showConfirm("တိကျသော မြေပုံလမ်းညွှန်စနစ် ရရှိစေရန် Location Mode ကို High Accuracy ထားပေးရန် လိုအပ်သည်။").then(() => Diagnostic.switchToLocationSettings());
            }
          });
        }
      });
    }
  }

  ionViewDidLoad() {
    this.showLoadingView();
    this.doRefresh();
  }

  loadData() {
    Category.load(this.params).then(data => {
      this.categories = this.categories.concat(data);
      this.onRefreshComplete(data);
      if (this.categories.length) {
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
    this.categories = [];

    this.loadData();
  }

  goToPlacesPage(category: any) {
    this.navigateTo(PlacesPage, category);
  }

}
