import { showAlert } from './utils/common.js';

import EventsModel from './model/events-model.js';
import OffersModel from './model/offers-model.js';
import DestinationsModel from './model/destinations-model.js';

import FilterView from './view/filter-view.js';
import InfoView from './view/info-view.js';

import { render } from './framework/render.js';
import EventsPresenter from './presenter/events-presenter.js';

import { getData } from './api.js';

const siteHeaderFiltersNode = document.querySelector('.trip-controls__filters');
const siteHeaderInfoContainerNode = document.querySelector('.trip-main');
const siteEventsNode = document.querySelector('.trip-events');


render(new InfoView(), siteHeaderInfoContainerNode, 'afterbegin');
render(new FilterView(), siteHeaderFiltersNode);

getData(
  (events, offers, destinations) => {
    const eventsModel = new EventsModel(events);
    const offersModel = new OffersModel(offers);
    const destinationsModel = new DestinationsModel(destinations);
    const eventsPresenter = new EventsPresenter({
      eventsContainer: siteEventsNode,
      eventsModel,
      offersModel,
      destinationsModel
    });

    eventsPresenter.init();
  },
  (error) => {
    showAlert(`Не удалось загрузить данныйе. Ощибка: ${error}`);
    console.log(error);
  }
);

