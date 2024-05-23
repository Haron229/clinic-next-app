import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { Doctor } from "./types";
import { is } from "date-fns/locale";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function calculateTimeWindows(doc: Doctor): string[] {
  const duration = parseInt(doc.appointmentDuration);

  let startHour = parseInt(doc.startTime.split(":")[0]);
  let startMinutes = parseInt(doc.startTime.split(":")[1]);
  let endHour = parseInt(doc.endTime.split(":")[0]);
  let endMinutes = parseInt(doc.endTime.split(":")[1]);
  let breakHour = parseInt(doc.breakTime.split(":")[0]);
  let breakMinutes = parseInt(doc.breakTime.split(":")[1]);

  let start = new Date();
  let end = new Date();
  let _break = new Date();

  start.setHours(startHour);
  start.setMinutes(startMinutes);
  end.setHours(endHour);
  end.setMinutes(endMinutes);
  _break.setHours(breakHour);
  _break.setMinutes(breakMinutes);

  let window = start;
  let windows: Date[] = [];

  while (window.getTime() + duration * 60000 <= end.getTime()) {
    windows.push(new Date(window));
    window.setTime(window.getTime() + duration * 60000);

    if (window.getTime() >= _break.getTime() && window.getTime() < _break.getTime() + 3600000)
      window.setTime(_break.getTime() + 3600000);
  }

  return windows.map((window) => {
    let hour = window.getHours().toString();
    let minutes = window.getMinutes() >= 10 ? window.getMinutes().toString() : "0".concat(window.getMinutes().toString());
    return hour + ":" + minutes;
  });
}

export function isDoctor(obj: any): obj is Doctor {
  return obj && obj.appointmentDuration;
}
