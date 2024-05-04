import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);

import { FilterType } from '../const.js';

const DATE_FORMAT = 'DD/MM/YY HH:mm';
const DATE_FORMAT_DAY = 'MMM D';
const DATE_FORMAT_HOURS = 'hh:mm';

function formatEventDate(date) {
  return date ? dayjs(date).format(DATE_FORMAT) : '';
}
function humanizeEventDateDay(date) {
  return date ? dayjs(date).format(DATE_FORMAT_DAY) : '';
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

function filterEventByDeadline(event, deadline) {
  const dateFrom = dayjs(event.dateFrom);
  const dateTo = dayjs(event.dateTo);
  const dateNow = dayjs();

  switch (deadline) {
    case FilterType.EVERYTHING.toLocaleLowerCase():
      return true;

    case FilterType.FUTURE.toLocaleLowerCase():
      return dateFrom.diff(dateNow) >= 0;

    case FilterType.PAST.toLocaleLowerCase():
      return dateTo.diff(dateNow) <= 0;
  }
}

function getNoEventsText(filterType) {
  switch (filterType) {
    case FilterType.EVERYTHING.toLocaleLowerCase():
      return 'Click New Event to create your first point';

    case FilterType.FUTURE.toLocaleLowerCase():
      return 'There are no future events now';

      case FilterType.PAST.toLocaleLowerCase():
      return 'There are no past events now';
  }

};

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
  formatEventDate,
  humanizeEventDateDay,
  humanizeEventDateHours,
  eventDatesDiff,
  filterEventByDeadline,
  sortEventsByDay,
  sortEventsByTime,
  sortEventsByPrice,
  getNoEventsText,
};
