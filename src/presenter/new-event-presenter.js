import { render, replace, remove, RenderPosition } from '../framework/render.js';

import EventEditView from '../view/event-edit-view.js';
import { UserAction, UpdateType } from '../const.js';
import { isDatesEqual } from '../utils/event.js';
import {nanoid} from 'nanoid';

export default class EventPresenter {
  #eventsListContainer = null;
  #handleDataChange = null;
  #handleDestroy = null;


  #eventEditComponent = null;

  #offersModel = null;
  #destinationsModel = null;

  constructor({
    eventsListContainer,
    onDataChange,
    offersModel,
    destinationsModel,
    onDestroy,
  }) {

    this.#eventsListContainer = eventsListContainer;
    this.#handleDataChange = onDataChange;

    this.#handleDestroy = onDestroy;

    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;
  }

  init() {

    if (this.#eventEditComponent !== null) {
      return;
    }

    this.#eventEditComponent = new EventEditView({
      offersModel: this.#offersModel,
      destinationsModel: this.#destinationsModel,
      onFormSubmit: this.#handleFormSubmit,
      onDeleteEventClick: this.#handleDeleteEventClick,
    });

    render(this.#eventEditComponent, this.#eventsListContainer, RenderPosition.AFTERBEGIN);

    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  destroy() {
    if (this.#eventEditComponent === null) {
      return;
    }

    this.#handleDestroy();

    remove(this.#eventEditComponent);
    this.#eventEditComponent = null;

    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }


  #handleDeleteEventClick = () => {
    this.destroy();
  };

  #handleFormSubmit = (event) => {

    this.#handleDataChange(
      UserAction.ADD_EVENT,
      UpdateType.MINOR,
      {id: nanoid(), ...event},
    );

    this.destroy();
  };



  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
    }
  };
}
