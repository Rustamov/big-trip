import {createElement} from '../render.js';

function createEventsEmptyTemplate() {
  return (
    `<p class="trip-events__msg">
      Click New Event to create your first point
    </p>`
  );
}

export default class EventsEmptyView {
  #element = null;

  get template() {
    return createEventsEmptyTemplate();
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}
