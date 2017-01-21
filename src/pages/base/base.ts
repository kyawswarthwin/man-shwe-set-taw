import { Injector } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController, ToastController } from 'ionic-angular';

export abstract class BasePage {

  protected navParams: NavParams;
  protected refresher: any;
  protected infiniteScroll: any;

  private navCtrl: NavController;
  private alertCtrl: AlertController;
  private loadingCtrl: LoadingController;
  private loading: any;
  private toastCtrl: ToastController;

  constructor(public injector: Injector) {
    this.navCtrl = injector.get(NavController);
    this.navParams = injector.get(NavParams);
    this.alertCtrl = injector.get(AlertController);
    this.loadingCtrl = injector.get(LoadingController);
    this.toastCtrl = injector.get(ToastController);
  }

  navigateTo(page: any, params?: any) {
    this.navCtrl.push(page, params);
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

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please Wait...'
    });
    this.loading.present();
  }

  hideLoading() {
    this.loading.dismiss();
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
    } else if (this.infiniteScroll) {
      this.infiniteScroll.complete();
      if (data.length === 0) {
        this.infiniteScroll.enable(false);
      } else {
        this.infiniteScroll.enable(true);
      }
    }
  }

}
