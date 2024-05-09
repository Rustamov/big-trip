import AbstractView from '../framework/view/abstract-view.js';
import { getNoEventsText } from '../utils/event.js';
import { FilterType } from '../const.js';


const NoEventsTextType = {
  [FilterType.EVERYTHING]: 'Click New Event to create your first point',
  [FilterType.FUTURE]: 'There are no future events now',
  [FilterType.PAST]: 'There are no past events now',
};

function createEventsEmptyTemplate(filterType) {
  let messageText = NoEventsTextType[filterType];

  return (
    `<p class="trip-events__msg">${messageText}</p>`
  );
}

export default class EventsEmptyView extends AbstractView {
  #currentFilter = null;

  constructor({ currentFilter }) {
    super();
    this.#currentFilter = currentFilter;
  }
  get template() {
    return createEventsEmptyTemplate(this.#currentFilter);
  }
}
