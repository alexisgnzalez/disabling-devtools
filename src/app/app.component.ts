import { Component } from '@angular/core';
import { DevtoolsService } from './devtools.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  message: string = '';

  constructor(public devtools: DevtoolsService) {
    devtools.init();
  }
}
