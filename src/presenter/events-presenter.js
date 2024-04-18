import { render } from '../render.js';

import SortView from '../view/sort-view.js';
import EventView from '../view/event-view.js';
import EventsListView from '../view/events-list.js';
import EventsEmptyView from '../view/events-empty.js';
import EventNewView from '../view/event-new-view.js';
import EventEditView from '../view/event-edit-view.js';

export default class EventsPresenter {
  #events = [];
  #offers = [];

  #eventsContainer = null;
  #eventsModel = null;
  #offersModel = null;

  #eventsListComponent = new EventsListView();

  constructor({ eventsContainer, eventsModel, offersModel }) {
    this.#eventsContainer = eventsContainer;
    this.#eventsModel = eventsModel;
    this.#offersModel = offersModel;
  }

  init() {
    this.#events = [...this.#eventsModel.events];
    this.#offers = [...this.#offersModel.offers];

    this.#renderEvents();
  }

  #renderEvents = () => {
    if (this.#events.length === 0) {
      render(new EventsEmptyView(), this.#eventsContainer);
    } else {
      render(new SortView(), this.#eventsContainer);
      render(this.#eventsListComponent, this.#eventsContainer);

      for (let i = 0; i < this.#events.length; i++) {
        const eventOffers = this.#offers
          .filter((offer) => offer.type === this.#events[i].type)
          [0]
          .offers;

        this.#renderEvent(this.#events[i], eventOffers);
      }
    }

  };

  #renderEvent = (event, offers) => {
    const eventParams = { event, offers };

    const eventComponent = new EventView(eventParams);
    const eventEditComponent = new EventEditView(eventParams);

    const replaceEventToForm = () => {
      this.#eventsListComponent.element.replaceChild(eventEditComponent.element, eventComponent.element);
    };

    const replaceFormToEvent = () => {
      this.#eventsListComponent.element.replaceChild(eventComponent.element, eventEditComponent.element);
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        replaceFormToEvent();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    eventComponent.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
      replaceEventToForm();
      document.addEventListener('keydown', onEscKeyDown);
    });

    eventEditComponent.element.querySelector('form.event').addEventListener('submit', (evt) => {
      evt.preventDefault();
      replaceFormToEvent();
      document.removeEventListener('keydown', onEscKeyDown);
    });

    render(
      eventComponent,
      this.#eventsListComponent.element
    );


  };
}
