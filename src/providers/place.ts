import { Injectable } from '@angular/core';
import Parse from 'parse';
import { Category } from './category';

@Injectable()
export class Place extends Parse.Object {

  constructor() {
    super('Place');
  }

  static load(params: any): Promise<Place[]> {
    return new Promise((resolve, reject) => {
      let page = params.page || 0;
      let limit = params.limit || 10;

      let query = new Parse.Query(this);

      query.include('category');

      if (params.category) query.equalTo('category', params.category);

      if (params.location) {
        let point = new Parse.GeoPoint({
          latitude: params.location.latitude,
          longitude: params.location.longitude
        });
        query.near('location', point);
      } else {
        query.descending('createdAt');
      }

      query.equalTo('isApproved', true);

      query.skip(page * limit);
      query.limit(limit);

      query.find().then(data => resolve(data), error => reject(error));
    });
  }

  distance(location: any, unit: string): string {
    if (!location) return null;
    let point = new Parse.GeoPoint({
      latitude: location.latitude,
      longitude: location.longitude
    });
    if (unit === 'km') {
      return this.location.kilometersTo(point).toFixed(2) + ' ' + unit;
    } else {
      return this.location.milesTo(point).toFixed(2) + ' ' + unit;
    }
  }

  get image(): Parse.File {
    return this.get('image');
  }

  get name(): string {
    return this.get('name');
  }

  get category(): Category {
    return this.get('category');
  }

  get description(): string {
    return this.get('description');
  }

  get location(): Parse.GeoPoint {
    return this.get('location');
  }

  get address(): string {
    return this.get('address');
  }

  get phone(): string {
    return this.get('phone');
  }

}

Parse.Object.registerSubclass('Place', Place);
