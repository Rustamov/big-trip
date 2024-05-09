import { showAlert } from './utils/common.js';

import EventsModel from './model/events-model.js';
import OffersModel from './model/offers-model.js';
import FilterModel from './model/filter-model.js';
import DestinationsModel from './model/destinations-model.js';

import InfoView from './view/info-view.js';
import NewEventButtonView from './view/new-event-button-view.js';


import { render } from './framework/render.js';
import RoutePresenter from './presenter/route-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';

// import { getData } from './api.js';

import EventsApiService from './events-api-service.js';
import OffersApiService from './offers-api-service.js';
import DestinationsApiService from './destinations-api-service.js';

const AUTHORIZATION = 'Basic hS2sfsdfvfgfS44wcl1sa2j13dsdsd';
const END_POINT = 'https://17.ecmascript.htmlacademy.pro/big-trip';


const siteHeaderFiltersNode = document.querySelector('.trip-controls__filters');
const siteHeaderInfoContainerNode = document.querySelector('.trip-main');
const siteEventsNode = document.querySelector('.trip-events');


render(new InfoView(), siteHeaderInfoContainerNode, 'afterbegin');

const filterModel = new FilterModel();
const filterPresenter = new FilterPresenter({
  filterContainer: siteHeaderFiltersNode,
  filterModel,
});

const eventsModel = new EventsModel({
  eventsApiService: new EventsApiService(END_POINT, AUTHORIZATION)
});

const offersModel = new OffersModel({
  offersApiService: new OffersApiService(END_POINT, AUTHORIZATION)
});

const destinationsModel = new DestinationsModel({
  destinationsApiService: new DestinationsApiService(END_POINT, AUTHORIZATION)
});


// const offersModel = new OffersModel(offers);
// const destinationsModel = new DestinationsModel(destinations);

// const routePresenter = new RoutePresenter({
//   eventsContainer: siteEventsNode,
//   eventsModel,
//   offersModel,
//   destinationsModel,
//   filterModel,
//   onNewEventDestroy: handleNewEventFormClose,

// });

// routePresenter.init();


filterPresenter.init();



eventsModel.init();
offersModel.init();
destinationsModel.init();


setTimeout(() => {

  const routePresenter = new RoutePresenter({
    eventsContainer: siteEventsNode,
    eventsModel,
    offersModel,
    destinationsModel,
    filterModel,
    onNewEventDestroy: handleNewEventFormClose,

  });

  routePresenter.init();



  const newEventButtonComponent = new NewEventButtonView({
    onClick: handleNewEventButtonClick
  });

  function handleNewEventFormClose() {
    newEventButtonComponent.element.disabled = false;
  }

  function handleNewEventButtonClick() {
    routePresenter.createEvent();
    newEventButtonComponent.element.disabled = true;
  }

  render(newEventButtonComponent, siteHeaderInfoContainerNode);
}, 2000)


// const offersModel = new OffersModel(offers);
// const destinationsModel = new DestinationsModel(destinations);
// const routePresenter = new RoutePresenter({
//   eventsContainer: siteEventsNode,
//   eventsModel,
//   offersModel,
//   destinationsModel,
//   filterModel,
//   onNewEventDestroy: handleNewEventFormClose,

// });
// routePresenter.init();
// console.log(routePresenter.events[0]);
// console.log(routePresenter.destinations[0]);
// console.log(routePresenter.offers[0]);

// const newEventButtonComponent = new NewEventButtonView({
//   onClick: handleNewEventButtonClick
// });

// function handleNewEventFormClose() {
//   newEventButtonComponent.element.disabled = false;
// }

// function handleNewEventButtonClick() {
//   routePresenter.createEvent();
//   newEventButtonComponent.element.disabled = true;
// }

// render(newEventButtonComponent, siteHeaderInfoContainerNode);







// getData(
//   (events, offers, destinations) => {
//     const eventsModel = new EventsModel(events);
//     const offersModel = new OffersModel(offers);
//     const destinationsModel = new DestinationsModel(destinations);
//     const routePresenter = new RoutePresenter({
//       eventsContainer: siteEventsNode,
//       eventsModel,
//       offersModel,
//       destinationsModel,
//       filterModel,
//       onNewEventDestroy: handleNewEventFormClose,

//     });
//     routePresenter.init();
//     console.log(routePresenter.events[0]);
//     console.log(routePresenter.destinations[0]);
//     console.log(routePresenter.offers[0]);

//     const newEventButtonComponent = new NewEventButtonView({
//       onClick: handleNewEventButtonClick
//     });

//     function handleNewEventFormClose() {
//       newEventButtonComponent.element.disabled = false;
//     }

//     function handleNewEventButtonClick() {
//       routePresenter.createEvent();
//       newEventButtonComponent.element.disabled = true;
//     }

//     render(newEventButtonComponent, siteHeaderInfoContainerNode);

//   },
//   (error) => {
//     showAlert(`Не удалось загрузить данныйе. Ощибка: ${error}`);
//     console.log(error);
//   }
// );

