import Observable from '../framework/observable.js';
import { UpdateType } from '../const.js';

export default class OffersModel extends Observable {
  #offersApiService = null;

  #offers = [];

  constructor({ offersApiService }) {
    super();

    this.#offersApiService = offersApiService;

  }

  get offers() {
    return this.#offers;
  }

  async init() {
    try {
      this.#offers = await this.#offersApiService.offers;
    } catch (err) {
      this.#offers = [];
    }

    this._notify(UpdateType.INIT);
  }

  getOffersByType(type) {
    return this.#offers
      .find((offer) => offer.type === type)
      .offers;
  }

}
