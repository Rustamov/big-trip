import AbstractView from '../framework/view/abstract-view.js';
import { humanizeEventDate, humanizeEventDateHours, eventDatesDiff } from '../utils/event.js';


function createOffresTemplate(offersIdList, offers) {
  const filteredOffers = offers.filter((offer) => offersIdList.includes(offer.id));

  if (offers.length === 0) {
    return '';
  }
  return (
    `<ul class="event__selected-offers">
      ${filteredOffers.map((offer) => `
        <li class="event__offer">
          <span class="event__offer-title">${offer.title}</span>
          +€&nbsp;
          <span class="event__offer-price">${offer.price}</span>
        </li>
      `).join('')}
    </ul>`

  );
}

function createEventPointTemplate(event, offers) {
  const {
    basePrice,
    dateFrom = null,
    dateTo = null,
    destination,
    id,
    isFavorite,
    offers: offersIdList,
    type,
  } = event;

  const dateFromDay = dateFrom !== null ? humanizeEventDate(dateFrom) : '';

  const dateFromExac = dateFrom !== null ? humanizeEventDateHours(dateFrom) : '';
  const dateToExac = dateTo !== null ? humanizeEventDateHours(dateTo) : '';

  const favoriteButtonClassName = isFavorite
    ? 'event__favorite-btn event__favorite-btn--active'
    : 'event__favorite-btn';

  const datesDiff = !dateFrom !== null || dateTo !== null
    ? eventDatesDiff(dateFrom, dateTo)
    : '';


  const offresTemplate = createOffresTemplate(offersIdList, offers);

  return (
    `< li class="trip-events__item" >
  <div class="event">
    <time class="event__date" datetime="2019-03-18">${dateFromDay}</time>
    <div class="event__type">
      <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
    </div>
    <h3 class="event__title">${destination.name}</h3>
    <div class="event__schedule">
      <p class="event__time">
        <time class="event__start-time" datetime="2019-03-18T10:30">${dateFromExac}</time>
        &mdash;
        <time class="event__end-time" datetime="2019-03-18T11:00">${dateToExac}</time>
      </p>
      <p class="event__duration">${datesDiff}</p>
    </div>
    <p class="event__price">
      &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
    </p>
    <h4 class="visually-hidden">Offers:</h4>
    ${offresTemplate}
    <button class="${favoriteButtonClassName}" type="button">
      <span class="visually-hidden">Add to favorite</span>
      <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
        <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z" />
      </svg>
    </button>
    <button class="event__rollup-btn" type="button">
      <span class="visually-hidden">Open event</span>
    </button>
  </div>
  </li > `
  );
}

export default class EventView extends AbstractView {
  #event = {};
  #offers = [];

  #handleEditClick = null;
  #handleFavoriteClick = null;

  constructor({ event, offers, onEditClick, onFavoriteClick }) {
    super();
    this.#event = event;
    this.#offers = offers;
    this.#handleEditClick = onEditClick;
    this.#handleFavoriteClick = onFavoriteClick;

    this.element.querySelector('.event__rollup-btn')
      .addEventListener('click', this.#onEditClick);

    this.element.querySelector('.event__favorite-btn')
      .addEventListener('click', this.#onFavoriteClick);

  }

  get template() {
    return createEventPointTemplate(this.#event, this.#offers);
  }

  #onEditClick = (evt) => {
    evt.preventDefault();
    this.#handleEditClick();
  };

  #onFavoriteClick = (evt) => {
    evt.preventDefault();
    this.#handleFavoriteClick();
  };
}
