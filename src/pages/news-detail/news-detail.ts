import { Component, Injector } from '@angular/core';
import { BasePage } from '../base/base';
import { BlogService } from '../../providers/blog-service';

@Component({
  selector: 'page-news-detail',
  templateUrl: 'news-detail.html'
})
export class NewsDetailPage extends BasePage {
  private url: string;
  public details: any = [];

  constructor(public injector: Injector,
    public blog: BlogService) {
    super(injector);
    this.url = this.navParams.data.url;
  }

  ionViewDidLoad() {
    this.showLoadingView();
    this.getPostDetails(this.url);
  }

  getPostDetails(url: string) {
    this.blog.postDetails(url).then(data => {
      this.details.push(data);
      // this.hideLoading();
    }, error => {
      // this.hideLoading();
      console.log(error);
    });
  }
}
