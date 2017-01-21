import { Injectable } from '@angular/core';
import Parse from 'parse';

@Injectable()
export class Place extends Parse.Object {

  constructor() {
    super('Place');
  }

  static load(params): Promise<Place[]> {
    return new Promise((resolve, reject) => {
      let page = params.page || 0;
      let limit = params.limit || 10;

      let query = new Parse.Query(this);

      query.equalTo('category', params.category);
      query.include('category');

      let point = new Parse.GeoPoint({
        latitude: params.location.latitude,
        longitude: params.location.longitude
      });
      query.near('location', point);

      query.skip(page * limit);
      query.limit(limit);

      query.find().then(data => resolve(data), error => reject(error));
    });
  }

  distance(location, unit): string {
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

  get description(): string {
    return this.get('description');
  }

  get location(): Parse.GeoPoint {
    return this.get('location');
  }

}

Parse.Object.registerSubclass('Place', Place);
