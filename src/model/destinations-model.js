export default class DestinationsModel {
  #destinations = [];

  constructor(destinations) {
    this.#destinations = [...destinations];
  }

  get destinations() {
    return this.#destinations;
  }

  getDestinationByName(name) {
    return this.#destinations
      .find((destination) => destination.name === name);
  }
}
