import { Component, Injector, ViewChild, NgZone } from '@angular/core';
import { BasePage } from '../base/base';
import { Content } from 'ionic-angular';
import { BlogService } from '../../providers/blog-service';
import { NewsDetailPage } from '../news-detail/news-detail';

@Component({
  selector: 'page-news',
  templateUrl: 'news.html'
})
export class NewsPage extends BasePage {

  @ViewChild(Content) content: Content;

  public posts: any;
  public searchQuery: string = '';
  public page: number = 1;
  public showButton: boolean;

  constructor(public injector: Injector,
    public zone: NgZone,
    public blog: BlogService) {
    super(injector);
  }

  ionViewDidLoad() {
    this.showLoadingView();
    this.blog.posts().then(data => {
      this.posts = data;
      this.showContentView();
    }, error => {
      this.showErrorView();
    });
  }

  goToNewsDetailPage(url: string) {
    this.navigateTo(NewsDetailPage, {
      url: url
    });
  }

  searchPosts(query: string) {
    this.showLoadingView();
    this.blog.searchPosts(query).then(data => {
      this.posts = data;
      this.page = 1;
      // this.hideLoading();
    }, error => {
      // this.hideLoading();
      console.log(error);
    });
  }

  clearSearch(event: any) {
    if (!event.target.value) {
      this.blog.posts().then(data => {
        this.posts = data;
        this.page = 1;
      }, error => {
        console.log(error);
      });
    }
  }

  doInfinite(infiniteScroll: any) {
    if (!this.searchQuery) {
      this.blog.posts(this.page + 1).then(data => {
        infiniteScroll.complete();
        let newPosts: any = data;
        if (newPosts.length === 0) {
          this.showToast('No More Posts');
        } else {
          this.posts = this.posts.concat(newPosts);
          this.page++;
        }
      }, error => {
        infiniteScroll.complete();
        console.log(error);
      });
    } else {
      this.blog.searchPosts(this.searchQuery, this.page + 1).then(data => {
        infiniteScroll.complete();
        let newPosts: any = data;
        if (newPosts.length === 0) {
          this.showToast('No More Posts');
        } else {
          this.posts = this.posts.concat(newPosts);
          this.page++;
        }
      }, error => {
        infiniteScroll.complete();
        console.log(error);
      });
    }
  }

  doRefresh(refresher: any) {
    this.blog.posts().then(data => {
      refresher.complete();
      this.posts = data;
      this.searchQuery = '';
      this.page = 1;
    }, error => {
      refresher.complete();
      console.log(error);
    });
  }

  onScrollEnd(event: any) {
    this.zone.run(() => {
      this.showButton = event.scrollTop > 0;
    });
  }

  scrollToTop() {
    this.content.scrollToTop();
  }

}
