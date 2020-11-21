const moment = require('moment');

export function convertDateToString(date: Date): string {
  return moment(date).format('YYYY-MM-DD[T]HH[h]mm[m]ss[s]');
}

export function convertDateToShortString(date: Date): string {
  return moment(date).format('MMDDHHmmss');
}

export function getTomorrowDate(): Date {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return tomorrow;
}

export function getAdjustedDate(day: number): Date {
  const adjustedDate = new Date();
  adjustedDate.setDate(adjustedDate.getDate() + day);
  return adjustedDate;
}

export function getTodayDate(): Date {
  return new Date();
}
