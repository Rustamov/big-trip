import { render, remove } from '../framework/render.js';
import { SortType, UpdateType, UserAction } from '../const.js';
import {
  filterEventByDeadline,
  sortEventsByDay,
  sortEventsByTime,
  sortEventsByPrice,
} from '../utils/event.js';

import SortView from '../view/sort-view.js';
import EventsListView from '../view/events-list-view.js';
import NoEventsView from '../view/no-events-view.js';

import EventPresenter from './event-presenter.js';



export default class RoutePresenter {
  #eventsContainer = null;
  #eventsModel = null;
  #offersModel = null;
  #destinationsModel = null;
  #filterModel = null;

  #sortComponent = null;
  #eventsListComponent = new EventsListView();
  #noEventsComponent = null;

  #eventPresenters = new Map();
  #currentSortType = SortType.DAY;


  constructor({ eventsContainer, eventsModel, offersModel, destinationsModel, filterModel }) {
    this.#eventsContainer = eventsContainer;
    this.#eventsModel = eventsModel;
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;
    this.#filterModel = filterModel;

    this.#eventsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelFilter);
  }

  init() {
    // this.#events = [...this.#eventsModel.events];
    // this.#offers = [...this.#offersModel.offers];

    // this.#sourcedEvents = [...this.#eventsModel.events];

    this.#renderRoute();
  }

  get events() {
    const events = [...this.#eventsModel.events].filter((event) => {
      return filterEventByDeadline(event, this.#filterModel.filter)
    });

    switch (this.#currentSortType) {
      case SortType.DAY:
        return events.sort(sortEventsByDay);

      case SortType.TIME:
        return events.sort(sortEventsByTime);

      case SortType.PRICE:
        return events.sort(sortEventsByPrice);
    }

    return this.#eventsModel.events;
  }

  get offers() {
    return this.#offersModel.offers;
  }

  get destinations() {
    return this.#destinationsModel.destinations;
  }

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_EVENT:
        this.#eventsModel.updateEvent(updateType, update);
        break;
      case UserAction.ADD_EVENT:
        this.#eventsModel.addEvent(updateType, update);
        break;
      case UserAction.DELETE_EVENT:
        this.#eventsModel.deleteEvent(updateType, update);
        break;
    }
  };

  #handleModelEvent = (updateType, data) => {
    console.log(updateType, data);

    switch (updateType) {
      case UpdateType.PATCH:
        // - обновить часть списка (например, когда поменялось описание)
        this.#eventPresenters.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        // - обновить список (например, когда задача ушла в архив)
        break;
      case UpdateType.MAJOR:
        // - обновить всю доску (например, при переключении фильтра)
        break;
    }

    // В зависимости от типа изменений решаем, что делать:
    // - обновить часть списка (например, когда поменялось описание)
    // - обновить список (например, когда задача ушла в архив)
    // - обновить всю доску (например, при переключении фильтра)
  };

  #handleModelFilter = (updateType, data) => {
    console.log(updateType, data);

    this.#currentSortType = SortType.DAY;

    this.#clearRoute();
    this.#renderRoute();
  };


  #handleSortTypeChange = (sortType) => {
    console.log(sortType);
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#clearRoute();
    this.#renderRoute();
  };

  #renderSort() {
    this.#sortComponent = new SortView({
      currentSortType: this.#currentSortType,
      onSortTypeChange: this.#handleSortTypeChange
    });

    render(this.#sortComponent, this.#eventsContainer);
  }

  #renderEvent = (event, offersModel, destinationsModel) => {
    const eventPresenter = new EventPresenter({
      eventsListContainer: this.#eventsListComponent.element,
      onDataChange: this.#handleViewAction,
      onModeChange: this.#handleModeChange,
      offersModel,
      destinationsModel,
    });

    eventPresenter.init(event);

    this.#eventPresenters.set(event.id, eventPresenter);
  };

  #renderEvents() {
    const events = this.events;
    for (let i = 0; i < events.length; i++) {
      this.#renderEvent(events[i], this.#offersModel, this.#destinationsModel);
    }
  }

  #renderNoEvents() {
    this.#noEventsComponent = new NoEventsView({
      currentFilter: this.#filterModel.filter
    });
    render(this.#noEventsComponent, this.#eventsContainer);
  }

  #clearRoute() {
    this.#eventPresenters.forEach((presenter) => presenter.destroy());
    this.#eventPresenters.clear();

    remove(this.#sortComponent);
    remove(this.#noEventsComponent);
  }

  #renderRoute() {
    const events = this.events;

    if (events.length === 0) {
      this.#renderNoEvents();
      return;
    }

    this.#renderSort();
    render(this.#eventsListComponent, this.#eventsContainer);

    this.#renderEvents();
  }

  #handleModeChange = () => {
    this.#eventPresenters.forEach((presenter) => presenter.resetView());
  };

  // #handleEventChange = (updatedEvent, offersModel, destinationsModel) => {
  //   this.#events = updateItem(this.#events, updatedEvent);
  //   this.#sourcedEvents = updateItem(this.#sourcedEvents, updatedEvent);
  //   this.#eventPresenters.get(updatedEvent.id).init(updatedEvent, offersModel, destinationsModel);
  // };

}
