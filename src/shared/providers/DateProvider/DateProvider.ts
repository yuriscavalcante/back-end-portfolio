import { DateProviderProps } from './DateProviderProps';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

export class DateProvider implements DateProviderProps {
  compareInHours(startDate: Date, endDate: Date): number {
    const end_date_utc = this.convertToUtc(endDate);
    const start_date_utc = this.convertToUtc(startDate);
    return dayjs(end_date_utc).diff(start_date_utc, 'hours');
  }

  convertToUtc(date: Date): string {
    return dayjs(date).utc().local().format();
  }

  compareInDays(startDate: Date, endDate: Date): number {
    const end_date_utc = this.convertToUtc(endDate);
    const start_date_utc = this.convertToUtc(startDate);
    return dayjs(end_date_utc).diff(start_date_utc, 'days');
  }

  dateNow(): Date {
    return dayjs().toDate();
  }

  addDays(days: number): Date {
    return dayjs().add(days, 'days').toDate();
  }

  addHours(hours: number): Date {
    return dayjs().add(hours, 'hour').toDate();
  }

  compareIfBefore(startDate: Date, endDate: Date): boolean {
    return dayjs(startDate).isBefore(endDate);
  }
}
