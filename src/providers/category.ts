import { Injectable } from '@angular/core';
import Parse from 'parse';

@Injectable()
export class Category extends Parse.Object {

  constructor() {
    super('Category');
  }

  static load(params: any): Promise<Category[]> {
    return new Promise((resolve, reject) => {
      let page = params.page || 0;
      let limit = params.limit || 15;

      let query = new Parse.Query(this);

      query.skip(page * limit);
      query.limit(limit);

      query.find().then(data => resolve(data), error => reject(error));
    });
  }

  get image(): Parse.File {
    return this.get('image');
  }

  get name(): string {
    return this.get('name');
  }

}

Parse.Object.registerSubclass('Category', Category);
