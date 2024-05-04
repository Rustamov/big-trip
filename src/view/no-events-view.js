import AbstractView from '../framework/view/abstract-view.js';
import { getNoEventsText } from '../utils/event.js';


function createEventsEmptyTemplate(filterType) {
  let messageText = getNoEventsText(filterType);

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
