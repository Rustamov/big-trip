import Observable from '../framework/observable.js';
export default class EventsModel extends Observable {
  #events = [];

  constructor(events) {
    super();

    this.#events = events.map(this.#adaptToClient);
  }

  get events() {
    return this.#events;
  }

  #adaptToClient(event) {
    const adaptedEvent = {...event,
      basePrice: event['base_price'],
      dateFrom: event['date_from'] !== null ? new Date(event['date_from']) : event['date_from'], // На клиенте дата хранится как экземпляр Date
      dateTo: event['date_to'] !== null ? new Date(event['date_to']) : event['date_to'], // На клиенте дата хранится как экземпляр Date
      isFavorite: event['is_favorite'],
    };

    // Ненужные ключи мы удаляем
    delete adaptedEvent['date_from'];
    delete adaptedEvent['date_to'];
    delete adaptedEvent['is_favorite'];
    delete adaptedEvent['base_price'];

    return adaptedEvent;
  }


  updateEvent(updateType, update) {
    const index = this.#events.findIndex((event) => event.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting event');
    }

    this.#events = [
      ...this.#events.slice(0, index),
      update,
      ...this.#events.slice(index + 1),
    ];

    this._notify(updateType, update);
  }

  addEvent(updateType, update) {
    this.#events = [
      update,
      ...this.#events,
    ];

    this._notify(updateType, update);
  }

  deleteEvent(updateType, update) {
    const index = this.#events.findIndex((event) => event.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting task');
    }

    this.#events = [
      ...this.#events.slice(0, index),
      ...this.#events.slice(index + 1),
    ];

    this._notify(updateType);
  }
}
