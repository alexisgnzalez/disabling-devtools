import { Component } from '@angular/core';

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

  constructor() {
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
      console.clear(); // se limpia la consola

      /* Vemos si devtools está abierto, medir el tiempo con un margen apropiado
        este está midiendo 20 ms */

      if (this.tableTime > this.logTime * 10) {
        this.message = 'Dev Tools abierto';
        // window.location.href = 'about:blank'; // aquí la redirección
      } else {
        this.message = 'Dev Tools cerrado';
      }
      /**************************/
    }, 1000);
  }

  measureTime(logData: () => void) {
    const initTime = new Date().getTime();
    logData();
    return new Date().getTime() - initTime;
  }
}
