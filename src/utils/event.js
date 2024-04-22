import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
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

function getWeightForNullDate(dateA, dateB) {
  if (dateA === null && dateB === null) {
    return 0;
  }

  if (dateA === null) {
    return 1;
  }

  if (dateB === null) {
    return -1;
  }

  return null;
}

function sortEventsByDay(eventA, eventB) {
  const weight = getWeightForNullDate(eventA.dateFrom, eventB.dateFrom);

  return weight ?? dayjs(eventA.dateFrom).diff(dayjs(eventB.dateFrom));
}

// function sortEventsByEvent(eventA, eventB) {
//   const weight = getWeightForNullDate(eventA.dateFrom, eventB.dateFrom);

//   return weight ?? dayjs(eventB.dateFrom).diff(dayjs(eventA.dateFrom));
// }

function sortEventsByTime(eventA, eventB) {
  const weight = getWeightForNullDate(eventA.dateFrom, eventB.dateFrom);

  if (weight !== null) {
    return weight;
  }

  const datesDiffA = dayjs(eventA.dateTo).diff(dayjs(eventA.dateFrom));
  const datesDiffB = dayjs(eventB.dateTo).diff(dayjs(eventB.dateFrom));


  return weight ?? datesDiffB - datesDiffA;
}

function sortEventsByPrice(eventA, eventB) {
  const weight = getWeightForNullDate(eventA.basePrice, eventB.dateFrom);

  return weight ?? eventB.basePrice - eventA.basePrice;
}

// function sortEventsByOffers(eventA, eventB) {

// }


export {
  humanizeEventDate,
  humanizeEventDateHours,
  eventDatesDiff,
  sortEventsByDay,
  sortEventsByTime,
  sortEventsByPrice,
};
