import AbstractView from '../framework/view/abstract-view.js';

function createEventsEmptyTemplate() {
  return (
    `<p class="trip-events__msg">
      Click New Event to create your first point
    </p>`
  );
}

export default class EventsEmptyView extends AbstractView {
  get template() {
    return createEventsEmptyTemplate();
  }
}
