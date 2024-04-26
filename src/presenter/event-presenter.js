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
  #offersModel = null;
  #destinationsModel = null;
  #mode = Mode.DEFAULT;

  constructor({ eventsListContainer, onDataChange, onModeChange }) {
    this.#eventsListContainer = eventsListContainer;
    this.#handleDataChange = onDataChange;
    this.#handleModeChange = onModeChange;
  }

  init(event, offersModel, destinationsModel) {
    this.#event = event;
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;

    const prevEventComponent = this.#eventComponent;
    const prevEventEditComponent = this.#eventEditComponent;

    this.#eventComponent = new EventView({
      event: this.#event,
      offersModel: this.#offersModel,
      destinationsModel: this.#destinationsModel,
      onEditClick: this.#handleEditClick,
      onFavoriteClick: this.#handleFavoriteClick,
    });

    this.#eventEditComponent = new EventEditView({
      event: this.#event,
      offersModel: this.#offersModel,
      destinationsModel: this.#destinationsModel,
      onFormSubmit: this.#handleFormSubmit,
      onCloseEditClick: this.#handleCloseEditClick,
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

  destroy() {
    remove(this.#eventComponent);
    remove(this.#eventEditComponent);
  }

  resetView() {
    if (this.#mode !== Mode.DEFAULT) {
      this.#replaceFormToEvent();
    }
  }

  #replaceEventToForm = () => {
    replace(this.#eventEditComponent, this.#eventComponent);
    this.#handleModeChange();
    this.#mode = Mode.EDITING;
    document.addEventListener('keydown', this.#escKeyDownHandler);
  };

  #replaceFormToEvent = () => {
    replace(this.#eventComponent, this.#eventEditComponent);
    this.#mode = Mode.DEFAULT;
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  };

  #handleEditClick = () => {
    this.#replaceEventToForm();
  };

  #handleCloseEditClick = () => {
    this.#replaceFormToEvent();
  };

  #handleFormSubmit = (event) => {
    this.#handleDataChange(event); // TODO
    this.#replaceFormToEvent();
  };

  #handleFavoriteClick = () => {
    this.#handleDataChange(
      {...this.#event, isFavorite: !this.#event.isFavorite},
      this.#offersModel
    );
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#replaceFormToEvent();
      document.removeEventListener('keydown', this.#escKeyDownHandler);
    }
  };
}
