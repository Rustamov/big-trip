import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
// var duration = require('dayjs/plugin/duration')
dayjs.extend(duration);

const DATE_FORMAT = 'MMM D';
const DATE_FORMAT_HOURS = 'hh:mm';

function humanizeEventDate(date) {
  return date ? dayjs(date).format(DATE_FORMAT) : '';
}

function humanizeEventDateHours(date) {
  return date ? dayjs(date).format(DATE_FORMAT_HOURS) : '';
}

function eventDatesDiff(dateFrom, dateTo) {
  const datesDiff = dayjs.duration(dayjs(dateTo).diff(dayjs(dateFrom)));

  function format(time, suffix) {
    return Math.floor(time).toString().padStart(2, '0') + suffix;
  }

  let dateStr = '';

  dateStr += datesDiff.asDays() >= 1 ? format(datesDiff.days(), 'D ') : '';
  dateStr += datesDiff.asHours() >= 1 ? format(datesDiff.hours(), 'H ') : '';
  dateStr += datesDiff.asMinutes() >= 1 ? format(datesDiff.minutes(), 'M ') : '';

  return dateStr.trim();
}






export {
  humanizeEventDate,
  humanizeEventDateHours,
  eventDatesDiff,
};
