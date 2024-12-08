import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { zonedTimeToUtc } from "date-fns-tz"; // Corrected import

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getNextRunTime(timezone: string, timeToSend: string) {
  const now = new Date();

  // Convert timeToSend to a Date object in the specified timezone
  const NextRunTime = zonedTimeToUtc(
    new Date(`${now.toDateString()} ${timeToSend}`),
    timezone
  );

  return NextRunTime;
}
