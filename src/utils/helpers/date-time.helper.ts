import moment from "moment-timezone";

export class DateTimeHelper {
    public static now(): Date {
        return moment().toDate();
    }

    public static datePlusHoursUnix(date: Date, hours: number): Date {
        return moment(date).add(hours, "hour").toDate();
    }

    public static nowUnix(): number {
        return moment().unix();
    }

    public static nowPlusHoursUnix(hours: number): number {
        return moment().add(hours, "hour").unix();
    }
}
