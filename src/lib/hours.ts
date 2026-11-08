import { site } from '../config/site';

/** Current weekday (0 = Sunday) and minutes since midnight in the business's timezone. */
export function nowInTimezone(date: Date = new Date(), timeZone: string = site.timezone) {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone,
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).formatToParts(date);
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? '';
  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const day = weekdays.indexOf(get('weekday'));
  const minutes = (Number(get('hour')) % 24) * 60 + Number(get('minute'));
  return { day, minutes };
}

function toMinutes(time: string) {
  const [h = 0, m = 0] = time.split(':').map(Number);
  return h * 60 + m;
}

export function isOpenAt(date: Date = new Date()): boolean {
  const { day, minutes } = nowInTimezone(date);
  const hours = site.hours[day];
  if (!hours) return false;
  return minutes >= toMinutes(hours.open) && minutes < toMinutes(hours.close);
}
