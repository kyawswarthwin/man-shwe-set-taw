import { Component, Injector } from '@angular/core';
import { BasePage } from '../base/base';

@Component({
  selector: 'page-page-detail',
  templateUrl: 'page-detail.html'
})
export class PageDetailPage extends BasePage {

  private page: any;

  constructor(public injector: Injector) {
    super(injector);

    this.page = this.navParams.data;
  }

  ionViewDidLoad() { }

}
