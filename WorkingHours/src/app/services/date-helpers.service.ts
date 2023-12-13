import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateHelpersService {

  constructor() { }

  calculateHourDifference(date1: Date, date2: Date): number {
    const timeDifference = date2.getTime() - date1.getTime();
    const hoursDifference = Math.round(timeDifference / (1000 * 60 * 60));
    return hoursDifference;
  }

  getIsoDate(timestamp?: number) {
    if (!timestamp) return new Date().toISOString();
    return new Date(timestamp).toISOString();
  }
}
