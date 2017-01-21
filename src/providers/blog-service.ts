import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class BlogService {

  private baseUrl: string = 'http://www.smartzawgyi.com/';

  constructor(public http: Http) { }

  posts(page: number = 1) {
    let url: string = this.baseUrl + 'wp-json/wp/v2/posts';
    url += '?_embed';
    url += '&page=' + page;

    return new Promise((resolve, reject) => {
      this.http.get(url).map(res => res.json()).subscribe(data => resolve(data), error => reject(error));
    });
  }

  postDetails(url: string) {
    url += '?_embed';

    return new Promise((resolve, reject) => {
      this.http.get(url).map(res => res.json()).subscribe(data => resolve(data), error => reject(error));
    });
  }

  searchPosts(query: string, page: number = 1) {
    let url: string = this.baseUrl + 'wp-json/wp/v2/posts';
    url += '?_embed';
    url += '&page=' + page;
    url += '&search=' + query;

    return new Promise((resolve, reject) => {
      this.http.get(url).map(res => res.json()).subscribe(data => resolve(data), error => reject(error));
    });
  }

}
