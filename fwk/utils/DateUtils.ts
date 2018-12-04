const moment = require('moment');

export class DateUtils {
  public static convertDateToString(date: Date): string {
    return moment(date).format('YYYY-MM-DD[T]HH[h]mm[m]ss[s]');
  }

  public static convertDateToShortString(date: Date): string {
    return moment(date).format('MMDDHHmmss');
  }

  public static getTomorrowDate(): Date {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow;
  }

  public static getAdjustedDate(day: number): Date {
    const adjustedDate = new Date();
    adjustedDate.setDate(adjustedDate.getDate() + day);
    return adjustedDate;
  }

  public static getTodayDate(): Date {
    return new Date();
  }

}
