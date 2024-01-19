import { Component } from '@angular/core';
import { DevtoolsService } from './devtools.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'disabling-devtools';
  time: number = 0;
  message: string = '';
  tableTime: number = 0;
  logTime: number = 0;

  /* Elemento que vamos a imprimir en consola */
  elemento_relleno: Array<Array<number>> = [];

  constructor(private devtools: DevtoolsService) {
    devtools.init();
    let aux: Array<number> = [];
    for (let i = 0; i < 20; i++) {
      aux.push(i * 997);
    }
    for (let i = 0; i < 50; i++) {
      this.elemento_relleno.push([...aux]);
    }

    setInterval(() => {
      this.tableTime = this.measureTime(() =>
        console.table(this.elemento_relleno)
      );
      this.logTime = this.measureTime(() => console.log(this.elemento_relleno));
      console.clear();

      if (this.tableTime > this.nonZeroLog(this.logTime) * 10) {
        this.message = 'Dev Tools abierto';
        window.location.href = 'about:blank';
      } else {
        this.message = 'Dev Tools cerrado';
      }
    }, 1000);
  }

  measureTime(logData: () => void) {
    const initTime = new Date().getTime();
    logData();
    return new Date().getTime() - initTime;
  }

  nonZeroLog(logTime: number) {
    return logTime <= 0 ? 1 : logTime;
  }
}
