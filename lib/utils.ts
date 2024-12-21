import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import moment from "moment-timezone";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getUTCNextRunTime(timezone: string, timeToSend: string): Date {
  // Get current time in the specified timezone
  const nowInTimezone = moment.tz(timezone);

  // Create a Moment.js object for today at the specified time
  const todayAtTimeToSend = moment.tz(
    `${nowInTimezone.format("YYYY-MM-DD")} ${timeToSend}`,
    "YYYY-MM-DD HH:mm",
    timezone
  );

  // If todayAtTimeToSend is already in the past, schedule for tomorrow
  if (todayAtTimeToSend.isBefore(nowInTimezone)) {
    todayAtTimeToSend.add(1, "day");
  }

  // Convert to UTC and format as string
  const UTCNextRunTime = todayAtTimeToSend.utc().toDate();

  return UTCNextRunTime;
}

export const truncateText = (Text: string, length: number = 20) => {
  const words = Text.split(" ");
  return words.length > length
    ? words.slice(0, length).join(" ") + "..."
    : Text;
};
