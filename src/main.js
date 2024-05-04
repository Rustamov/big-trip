import { showAlert } from './utils/common.js';

import EventsModel from './model/events-model.js';
import OffersModel from './model/offers-model.js';
import FilterModel from './model/filter-model.js';
import DestinationsModel from './model/destinations-model.js';

import InfoView from './view/info-view.js';

import { render } from './framework/render.js';
import RoutePresenter from './presenter/route-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';

import { getData } from './api.js';

const siteHeaderFiltersNode = document.querySelector('.trip-controls__filters');
const siteHeaderInfoContainerNode = document.querySelector('.trip-main');
const siteEventsNode = document.querySelector('.trip-events');


render(new InfoView(), siteHeaderInfoContainerNode, 'afterbegin');

const filterModel = new FilterModel();
const filterPresenter = new FilterPresenter({
  filterContainer: siteHeaderFiltersNode,
  filterModel,
});
filterPresenter.init();

getData(
  (events, offers, destinations) => {
    const eventsModel = new EventsModel(events);
    const offersModel = new OffersModel(offers);
    const destinationsModel = new DestinationsModel(destinations);
    const routePresenter = new RoutePresenter({
      eventsContainer: siteEventsNode,
      eventsModel,
      offersModel,
      destinationsModel,
      filterModel,
    });
    routePresenter.init();
    console.log(routePresenter.events[0]);
    console.log(routePresenter.destinations[0]);
    console.log(routePresenter.offers[0]);

  },
  (error) => {
    showAlert(`Не удалось загрузить данныйе. Ощибка: ${error}`);
    console.log(error);
  }
);

