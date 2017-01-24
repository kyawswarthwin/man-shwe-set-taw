import { Component, Injector } from '@angular/core';
import { BasePage } from '../base/base';
import { Place } from '../../providers/place';

@Component({
  selector: 'page-place-detail',
  templateUrl: 'place-detail.html'
})
export class PlaceDetailPage extends BasePage {

  private place: Place;

  constructor(public injector: Injector) {
    super(injector);

    this.place = this.navParams.data;
  }

  ionViewDidLoad() { }

}
