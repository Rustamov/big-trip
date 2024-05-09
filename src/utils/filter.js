import { FilterType } from '../const.js';
import dayjs from 'dayjs';

function filterEventByDeadline(event, deadline) {
  const dateFrom = dayjs(event.dateFrom);
  const dateTo = dayjs(event.dateTo);
  const dateNow = dayjs();

  switch (deadline) {
    case FilterType.EVERYTHING:
      return true;

    case FilterType.FUTURE:
      return dateFrom.diff(dateNow) >= 0;

    case FilterType.PAST:
      return dateTo.diff(dateNow) <= 0;
  }
}

export {
  filterEventByDeadline
};
