import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DevtoolsService {
  tableTime: number = 0;
  logTime: number = 0;
  placeholderLog: Array<Array<number>> = [];

  constructor() {
    this.fillPlaceholder();
  }

  fillPlaceholder() {
    let aux: Array<number> = [];
    for (let i = 0; i < 20; i++) {
      aux.push(i * 997);
    }
    for (let i = 0; i < 50; i++) {
      this.placeholderLog.push([...aux]);
    }
  }

  measureTime(logData: () => void) {
    const initTime = new Date().getTime();
    logData();
    return new Date().getTime() - initTime;
  }

  nonZeroLog(logTime: number) {
    return logTime <= 0 ? 1 : logTime;
  }

  init() {
    setInterval(() => {
      this.tableTime = this.measureTime(() =>
        console.table(this.placeholderLog)
      );
      this.logTime = this.measureTime(() => console.log(this.placeholderLog));
      console.clear();

      if (this.nonZeroLog(this.tableTime) > this.nonZeroLog(this.logTime) * 3) {
        window.location.href = 'about:blank';
      }
    }, 500);
  }
}
