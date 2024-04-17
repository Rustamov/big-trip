import {render} from '../render.js';

import SortView from '../view/sort-view.js';
import EventView from '../view/event-view.js';
import EventsListView from '../view/events-list.js';
import EventNewView from '../view/event-new-view.js';
import EventEditView from '../view/event-edit-view.js';

export default class EventsPresenter {
  eventsListComponent = new EventsListView();

  constructor({eventsContainer, eventsModel, offersModel}) {
    this.eventsContainer = eventsContainer;
    this.eventsModel = eventsModel;
    this.offersModel = offersModel;
  }

  init() {
    this.events = [...this.eventsModel.getEvents()];

    render(new SortView(), this.eventsContainer);
    render(this.eventsListComponent, this.eventsContainer);
    // render(new EventEditView(), this.eventsListComponent.getElement());

    for (let i = 0; i < this.events.length; i++) {
      render(
        new EventView({
          event: this.events[i],
          offers: this.offersModel.getOffersByType(this.events[i].type)
        }),
        this.eventsListComponent.getElement()
      );
    }
  }
}
