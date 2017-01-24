import { Injector } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController, ToastController } from 'ionic-angular';
import { Geolocation, LaunchNavigator, CallNumber } from 'ionic-native';

export abstract class BasePage {

  public isContentView: boolean;
  public isLoadingView: boolean;
  public isEmptyView: boolean;
  public isErrorView: boolean;

  protected navParams: NavParams;
  protected refresher: any;
  protected infiniteScroll: any;

  private navCtrl: NavController;
  private loadingCtrl: LoadingController;
  private loading: any;
  private alertCtrl: AlertController;
  private toastCtrl: ToastController;

  constructor(public injector: Injector) {
    this.navCtrl = injector.get(NavController);
    this.navParams = injector.get(NavParams);
    this.loadingCtrl = injector.get(LoadingController);
    this.alertCtrl = injector.get(AlertController);
    this.toastCtrl = injector.get(ToastController);
  }

  navigateTo(page: any, params?: any) {
    this.navCtrl.push(page, params);
  }

  showContentView() {
    this.isContentView = true;
    this.isLoadingView = false;
    this.isEmptyView = false;
    this.isErrorView = false;

    this.loading.dismiss();
  }

  showLoadingView() {
    this.isContentView = false;
    this.isLoadingView = true;
    this.isEmptyView = false;
    this.isErrorView = false;

    this.loading = this.loadingCtrl.create({
      content: 'ခေတ္တစောင့်ဆိုင်းပါ...'
    });
    this.loading.present();
  }

  showEmptyView() {
    this.isContentView = false;
    this.isLoadingView = false;
    this.isEmptyView = true;
    this.isErrorView = false;

    this.loading.dismiss();
  }

  showErrorView() {
    this.isContentView = false;
    this.isLoadingView = false;
    this.isEmptyView = false;
    this.isErrorView = true;

    this.loading.dismiss();
  }

  showConfirm(message: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      let alert = this.alertCtrl.create({
        title: '',
        message: message,
        buttons: [{
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            reject();
          }
        }, {
          text: 'OK',
          handler: () => {
            resolve(true);
          }
        }]
      });
      alert.present();
    });
  }

  showToast(message: string) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }

  onRefreshComplete(data?: any) {
    if (this.refresher) {
      this.refresher.complete();
    }

    if (this.infiniteScroll) {
      this.infiniteScroll.complete();
      if (data.length === 0) {
        this.infiniteScroll.enable(false);
      } else {
        this.infiniteScroll.enable(true);
      }
    }
  }

  getDirections(location: any) {
    Geolocation.getCurrentPosition({ timeout: 10000, enableHighAccuracy: true }).then(data => {
      LaunchNavigator.navigate([location.latitude, location.longitude], {
        start: [data.coords.latitude, data.coords.longitude]
      });
    }, error => {
      this.showToast('Location Unavailable');
    });
  }

  call(phone: string) {
    CallNumber.callNumber(phone, true);
  }

}
