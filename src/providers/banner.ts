import { Injectable } from '@angular/core';
import Parse from 'parse';

@Injectable()
export class Banner extends Parse.Object {

  constructor() {
    super('Banner');
  }

  static load(): Promise<Banner[]> {
    return new Promise((resolve, reject) => {
      let query = new Parse.Query(this);

      query.ascending('order');

      query.equalTo('isApproved', true);

      query.find().then(data => resolve(data), error => reject(error));
    });
  }

  get image(): Parse.File {
    return this.get('image');
  }

}

Parse.Object.registerSubclass('Banner', Banner);
