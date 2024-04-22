import { render } from '../framework/render.js';

import SortView from '../view/sort-view.js';
import EventsListView from '../view/events-list.js';
import EventsEmptyView from '../view/events-empty.js';
import {updateItem} from '../utils/common.js';

import EventPresenter from '../presenter/event-presenter.js';

import { SortType } from '../const.js';


export default class EventsPresenter {
  #eventsContainer = null;
  #eventsModel = null;
  #offersModel = null;

  #sortComponent = null;
  #eventsListComponent = new EventsListView();

  #events = [];
  #sourcedEvents = [];
  #eventPresenters = new Map();
  #offers = [];
  #currentSortType = SortType.DEFAULT;


  constructor({ eventsContainer, eventsModel, offersModel }) {
    this.#eventsContainer = eventsContainer;
    this.#eventsModel = eventsModel;
    this.#offersModel = offersModel;
  }

  init() {
    this.#events = [...this.#eventsModel.events];
    this.#offers = [...this.#offersModel.offers];

    this.#sourcedEvents = [...this.#eventsModel.events];

    this.#renderEvents();
  }


  #sortTasks(sortType) {
    switch (sortType) {
      case SortType.DATE_UP:
        this.#events.sort(sortTaskUp);
        break;
      case SortType.DATE_DOWN:
        this.#events.sort(sortTaskDown);
        break;
      default:
        this.#events = [...this.#sourcedEvents];
    }

    this.#currentSortType = sortType;
  }

  #handleSortTypeChange = (sortType) => {
    // if (this.#currentSortType === sortType) {
    //   return;
    // }

    // this.#sortTasks(sortType);
    // this.#clearEventsList();
    // this.#renderEventsList();
  };

  #renderSort() {
    this.#sortComponent = new SortView({
      onSortTypeChange: this.#handleSortTypeChange
    });

    render(this.#sortComponent, this.#eventsContainer);
  }

  #renderEvent = (event, offers) => {
    const eventPresenter = new EventPresenter({
      eventsListContainer: this.#eventsListComponent.element,
      onDataChange: this.#handleEventChange,
      onModeChange: this.#handleModeChange
    });

    eventPresenter.init(event, offers);

    this.#eventPresenters.set(event.id, eventPresenter);
  };

  #renderEventsList() {
    render(this.#eventsListComponent, this.#eventsContainer);

    for (let i = 0; i < this.#events.length; i++) {
      const eventOffers = this.#offers
        .find((offer) => offer.type === this.#events[i].type)
        .offers;

      this.#renderEvent(this.#events[i], eventOffers);
    }
  }

  #clearEventsList() {
    this.#eventPresenters.forEach((presenter) => presenter.destroy());
    this.#eventPresenters.clear();
  }

  #renderEvents() {
    this.#renderSort();
    this.#renderEventsList();
  }



  #handleModeChange = () => {
    this.#eventPresenters.forEach((presenter) => presenter.resetView());
  };

  #handleEventChange = (updatedEvent, offers) => {
    this.#events = updateItem(this.#events, updatedEvent);
    this.#sourcedEvents = updateItem(this.#sourcedEvents, updatedEvent);
    this.#eventPresenters.get(updatedEvent.id).init(updatedEvent, offers);
  };

}
