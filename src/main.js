import FilterView from './view/filter-view.js';
import InfoView from './view/info-view.js';

import {render} from './render.js';
import EventsPresenter from './presenter/events-presenter.js';

const siteHeaderFiltersNode = document.querySelector('.trip-controls__filters');
const siteHeaderInfoContainerNode = document.querySelector('.trip-main');
const siteEventsNode = document.querySelector('.trip-events');
const eventsPresenter = new EventsPresenter({eventsContainer: siteEventsNode});

render(new InfoView(), siteHeaderInfoContainerNode, 'afterbegin');
render(new FilterView(), siteHeaderFiltersNode);

eventsPresenter.init();
