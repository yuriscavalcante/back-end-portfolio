export interface DateProviderProps {
  compareInHours(startDate: Date, endDate: Date): number;
  convertToUtc(date: Date): string;
  compareInDays(startDate: Date, endDate: Date): number;
  dateNow(): Date;
  addDays(days: number): Date;
  addHours(hours: number): Date;
  compareIfBefore(startDate: Date, endDate: Date): boolean;
}
