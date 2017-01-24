import { Component, Input } from '@angular/core';

@Component({
  selector: 'empty-view',
  templateUrl: 'empty-view.html'
})
export class EmptyViewComponent {

  @Input() icon: string = 'alert';
  @Input() text: string = '';

  constructor() { }

}
