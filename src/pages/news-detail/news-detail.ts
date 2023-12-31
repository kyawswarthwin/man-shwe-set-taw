import { Component, Injector } from '@angular/core';
import { BasePage } from '../base/base';

@Component({
  selector: 'page-news-detail',
  templateUrl: 'news-detail.html'
})
export class NewsDetailPage extends BasePage {

  private post: any;

  constructor(public injector: Injector) {
    super(injector);

    this.post = this.navParams.data;
  }

  ionViewDidLoad() { }

}
