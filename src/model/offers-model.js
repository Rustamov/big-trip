export default class OffersModel {
  #offers = [];

  constructor(offers) {
    this.#offers = [...offers];
  }

  get offers() {
    return this.#offers;
  }

}
