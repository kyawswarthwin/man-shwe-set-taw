import { Component, Injector } from '@angular/core';
import { BasePage } from '../base/base';
import { AboutPage } from '../about/about';
import { TravelGuidePage } from '../travel-guide/travel-guide';
import { WeatherPage } from '../weather/weather';
import { NewsPage } from '../news/news';
import { PageDetailPage } from '../page-detail/page-detail';
import { WordPressService } from '../../providers/wordpress-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage extends BasePage {

  private options = {
    pager: true,
    autoplay: 8000,
    autoplayDisableOnInteraction: false
  };
  private slides = [
    {
      image: "assets/img/banner.jpg"
    },
    {
      image: "assets/img/banner2.jpg"
    },
    {
      image: "assets/img/banner3.jpg"
    }
  ];

  private items = [
    {
      title: "ခရီးသွားလမ်းညွှန်",
      page: TravelGuidePage
    },
    {
      title: "ရာသီဥတု",
      page: WeatherPage
    },
    {
      title: "သတင်း",
      page: NewsPage
    }
  ];

  private params: any = {};
  private pages: any[];

  constructor(public injector: Injector,
    public wordpress: WordPressService) {
    super(injector);
  }

  ionViewDidLoad() {
    this.showLoadingView();
    this.doRefresh();
  }

  goToAboutPage() {
    this.navigateTo(AboutPage);
  }

  getPages() {
    this.wordpress.pages(this.params).then(data => {
      this.pages = this.pages.concat(data);
      this.onRefreshComplete(data);
      this.showContentView();
    }, error => {
      this.onRefreshComplete();
      this.showErrorView();
    });
  }

  doInfinite(infiniteScroll: any) {
    this.infiniteScroll = infiniteScroll;
    this.params.page++;
    this.getPages();
  }

  doRefresh(refresher?: any) {
    this.refresher = refresher;

    this.params.page = 1;
    this.pages = [];

    this.getPages();
  }

  goToPageDetailPage(page: any) {
    this.navigateTo(PageDetailPage, page);
  }

}
