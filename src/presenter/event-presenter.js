import {render, replace, remove} from '../framework/render.js';

import EventView from '../view/event-view.js';
import EventEditView from '../view/event-edit-view.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export default class EventPresenter {
  #eventsListContainer = null;
  #handleDataChange = null;
  #handleModeChange = null;

  #eventComponent = null;
  #eventEditComponent = null;

  #event = null;
  #offers = null;
  #mode = Mode.DEFAULT;

  constructor({ eventsListContainer, onDataChange, onModeChange }) {
    this.#eventsListContainer = eventsListContainer;
    this.#handleDataChange = onDataChange;
    this.#handleModeChange = onModeChange;
  }

  init(event, offers) {
    this.#event = event;
    this.#offers = offers;

    const prevEventComponent = this.#eventComponent;
    const prevEventEditComponent = this.#eventEditComponent;

    this.#eventComponent = new EventView({
      event,
      offers,
      onEditClick: () => {
        this.#replaceEventToForm();
      }
    });

    this.#eventEditComponent = new EventEditView({
      event,
      offers,
      onFormSubmit: () => {
        this.#replaceFormToEvent();
      }
    });

    if (prevEventComponent === null || prevEventEditComponent === null) {
      render(this.#eventComponent, this.#eventsListContainer);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#eventComponent, prevEventComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#eventEditComponent, prevEventEditComponent);
    }

    remove(prevEventComponent);
    remove(prevEventEditComponent);
  }

  #replaceEventToForm = () => {
    replace(this.#eventEditComponent, this.#eventComponent);
    this.#handleModeChange();
    this.#mode = Mode.EDITING;
  };

  #replaceFormToEvent = () => {
    replace(this.#eventComponent, this.#eventEditComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
    this.#mode = Mode.DEFAULT;
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      replaceFormToEvent();
      document.removeEventListener('keydown', this.#escKeyDownHandler);
    }
  };
}
