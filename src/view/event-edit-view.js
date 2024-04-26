import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { formatEventDate } from '../utils/event.js';

function createOffresTemplate(offersIdList = [], typeOffers = []) {
  if (typeOffers.length === 0) {
    return '';
  }

  return (
    `<section class="event__section  event__section--offers">
    <h3 class="event__section-title  event__section-title--offers">Offers</h3>

    <div class="event__available-offers">
      ${typeOffers.map((offer) => `
        <div class="event__offer-selector">
          <input
            class="event__offer-checkbox
            visually-hidden"
            id="event-offer-${offer.id}"
            type="checkbox"
            name="event-offer-luggage"
            ${offersIdList.includes(offer.id) ? 'checked' : ''}
          >
          <label class="event__offer-label" for="event-offer-${offer.id}">
            <span class="event__offer-title">${offer.title}</span>
            &plus;&euro;&nbsp;
            <span class="event__offer-price">${offer.price}</span>
          </label>
        </div>
      `).join('')}
  </section>`);
}

function createDedestinationTemplate(destination) {
  if (destination === null) {
    return '';
  }

  return (
    `<section class="event__section  event__section--destination">
      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
      <p class="event__destination-description">${destination.description}</p>
      ${destination.pictures === null || destination.pictures.length === 0
      ? ''
      : `<div class="event__photos-container">
          <div class="event__photos-tape">
            ${destination.pictures.map((photo) => `
              <img class="event__photo" src="${photo.src}" alt="${photo.description}">
            `).join('')}
          </div>
        </div>`
    }
  </section>`);
}

function createEventEditTemplate(event, offersModel, destinationsModel) {
  const {
    basePrice,
    dateFrom = null,
    dateTo = null,
    destination = null,
    id,
    isFavorite,
    offers: offersIdList,
    type,
  } = event;

  // console.log(event);

  const dateFromFormated = dateFrom !== null ? formatEventDate(dateFrom) : '';
  const dateToFormated = dateTo !== null ? formatEventDate(dateTo) : '';

  const typeOffers = offersModel.getOffersByType(event.type)
  const offresTemplate = createOffresTemplate(offersIdList, typeOffers);
  const destinationTemplate = createDedestinationTemplate(destination);

  // const destinationsAll = destinationsModel.getDestinations;

  return (
    `<li class="trip-events__item">
    <form class="event event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-1">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
          </label>
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

          <div class="event__type-list">
            <fieldset class="event__type-group">
              <legend class="visually-hidden">Event type</legend>
              ${offersModel.offers.map((offer) => `
                <div class="event__type-item">
                  <input id="event-type-${offer.type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${offer.type}">
                  <label class="event__type-label  event__type-label--${offer.type}" for="event-type-${offer.type}-1">${offer.type}</label>
                </div>
              `).join('')}
            </fieldset>
          </div>
        </div>

        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-1">
            ${type}
          </label>
          <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination.name}" list="destination-list-1">
          <datalist id="destination-list-1">
            ${destinationsModel.destinations.map((destination) => `
              <option value="${destination.name}"></option>
            `).join('')}
          </datalist>
        </div>

        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">From</label>
          <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${dateFromFormated}">
          &mdash;
          <label class="visually-hidden" for="event-end-time-1">To</label>
          <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${dateToFormated}">
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice}">
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">Delete</button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </header>
      <section class="event__details">

        ${offresTemplate}
        ${destinationTemplate}



      </section>
    </form>
  </li>`
  );
}


export default class EventEditView extends AbstractStatefulView {
  #event = {};
  #offersModel = null;
  #destinationsModel = null;

  #handleFormSubmit = null;
  #handleCloseEditClick = null;


  constructor({ event, offersModel, destinationsModel, onFormSubmit, onCloseEditClick }) {
    super();

    this.#event = event;
    this._setState(this.#event);
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;
    this.#handleFormSubmit = onFormSubmit;
    this.#handleCloseEditClick = onCloseEditClick;

    this._restoreHandlers();
  }

  get template() {
    // console.log(this._state.type);
    return createEventEditTemplate(this._state, this.#offersModel, this.#destinationsModel);
  }

  _restoreHandlers() {
    this.element.querySelector('.event__rollup-btn')
      .addEventListener('click', this.#onCloseEditClick);

    this.element.querySelector('form.event')
      .addEventListener('submit', this.#onFormSubmit);

    this.element.querySelector('.event__input--price')
      .addEventListener('input', this.#onPriceInput);

    this.element.querySelector('.event__type-group')
      .addEventListener('change', this.#onTypeChange);

    this.element.querySelector('input[name=event-destination]')
      .addEventListener('change', this.#onDestinationChange);
  }

  reset(event) {
    this.updateElement(event);
  }

  #onFormSubmit = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit();
  };

  #onCloseEditClick = (evt) => {
    evt.preventDefault();
    this.#handleCloseEditClick();
  };


  #onPriceInput = (evt) => {
    evt.preventDefault();
    this._setState({
      basePrice: evt.target.value,
    });
  };

  #onTypeChange = () => {
    const type = this.element.querySelector('.event__type-group .event__type-input:checked').value;

    this.updateElement({
      type,
      offers: [], // offers id list
    });

  };

  #onDestinationChange = () => {
    const destinationName = this.element.querySelector('input[name=event-destination]').value;
    const destination = this.#destinationsModel.getDestinationsByName(destinationName);

    if (destination === undefined) {
      return;
    }

    this.updateElement({
      destination
    });
  };



}
