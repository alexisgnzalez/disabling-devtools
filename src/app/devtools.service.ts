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

  init() {
    setInterval(() => {
      this.logInfo();
      this.disableDevTools();
    }, 500);
  }

  logInfo() {
    this.tableTime = this.measureTime(() => {
      console.table(this.placeholderLog);
    });
    this.logTime = this.measureTime(() => console.log(this.placeholderLog[0]));
    console.clear();
  }

  measureTime(logData: () => void) {
    const initTime = new Date().getTime();
    logData();
    return new Date().getTime() - initTime;
  }

  disableDevTools() {
    if (this.nonZeroLog(this.tableTime) > this.nonZeroLog(this.logTime) * 8) {
      window.location.href = 'about:blank';
    }
  }

  nonZeroLog(logTime: number) {
    return logTime <= 0 ? 1 : logTime;
  }
}
