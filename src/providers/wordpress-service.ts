import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { WORDPRESS_URL } from './constants';

@Injectable()
export class WordPressService {

  private baseUrl: string = WORDPRESS_URL + '/wp-json/wp/v2';

  constructor(private http: Http) { }

  posts(params): Promise<any[]> {
    let url = this.baseUrl + '/posts';
    url += '?' + this.serialize(params);
    url += '&_embed';

    return new Promise((resolve, reject) => {
      this.http.get(url).map(res => res.json()).subscribe(data => resolve(data), error => reject(error));
    });
  }

  pages(params): Promise<any[]> {
    let url = this.baseUrl + '/pages';
    url += '?' + this.serialize(params);
    url += '&order=asc';
    url += '&orderby=menu_order';

    return new Promise((resolve, reject) => {
      this.http.get(url).map(res => res.json()).subscribe(data => resolve(data), error => reject(error));
    });
  }

  private serialize(object: any): string {
    let str: string[] = [];
    for (let key in object) {
      if (object.hasOwnProperty(key)) {
        str.push(encodeURIComponent(key) + '=' + encodeURIComponent(object[key]));
      }
    }
    return str.join('&');
  }

}
