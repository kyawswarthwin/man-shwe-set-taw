import { Component, Injector, ViewChild, NgZone } from '@angular/core';
import { Content } from 'ionic-angular';
import { BasePage } from '../base/base';
import { NewsDetailPage } from '../news-detail/news-detail';
import { WordPressService } from '../../providers/wordpress-service';

@Component({
  selector: 'page-news',
  templateUrl: 'news.html'
})
export class NewsPage extends BasePage {

  @ViewChild(Content) content: Content;

  private params: any = {};
  private posts: any[];
  private searchQuery: string = '';
  private showButton: boolean;

  constructor(public injector: Injector,
    public zone: NgZone,
    public wordpress: WordPressService) {
    super(injector);
  }

  ionViewDidLoad() {
    this.showLoadingView();
    this.doRefresh();
  }

  getPosts() {
    this.wordpress.posts(this.params).then(data => {
      this.posts = this.posts.concat(data);
      this.onRefreshComplete(data);
      if (this.posts.length) {
        this.showContentView();
      } else {
        this.showEmptyView();
      }
    }, error => {
      this.onRefreshComplete();
      this.showErrorView();
    });
  }

  searchPosts() {
    this.showLoadingView();
    this.doRefresh();
  }

  clearSearch(event: any) {
    if (!event.target.value) this.doRefresh();
  }

  doInfinite(infiniteScroll: any) {
    this.infiniteScroll = infiniteScroll;
    this.params.page++;
    this.getPosts();
  }

  doRefresh(refresher?: any) {
    this.refresher = refresher;

    this.params.page = 1;
    this.params.search = this.searchQuery;
    this.posts = [];

    this.getPosts();
  }

  onScrollEnd(event: any) {
    this.zone.run(() => {
      this.showButton = event.scrollTop > 0;
    });
  }

  scrollToTop() {
    this.content.scrollToTop();
  }

  goToNewsDetailPage(post: any) {
    this.navigateTo(NewsDetailPage, post);
  }

}
