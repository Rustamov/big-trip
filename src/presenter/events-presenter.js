import {render} from '../render.js';

import SortView from '../view/sort-view.js';
import EventView from '../view/event-view.js';
import EventsListView from '../view/events-list.js';
import EventNewView from '../view/event-new-view.js';
import EventEditView from '../view/event-edit-view.js';

export default class EventsPresenter {
  // boardComponent = new BoardView();
  eventsListComponent = new EventsListView();

  constructor({eventsContainer}) {
    this.eventsContainer = eventsContainer;
  }

  init() {
    // render(this.boardComponent, this.eventsContainer);
    render(new SortView(), this.eventsContainer);
    render(this.eventsListComponent, this.eventsContainer);
    // render(new EventNewView(), this.eventsListComponent.getElement());
    render(new EventEditView(), this.eventsListComponent.getElement());

    for (let i = 0; i < 3; i++) {
      render(new EventView(), this.eventsListComponent.getElement());
    }

    // render(new LoadMoreButtonView(), this.boardComponent.getElement());
  }
}
