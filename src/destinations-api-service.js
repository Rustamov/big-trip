import ApiService from './framework/api-service.js';

const Method = {
  GET: 'GET',
  PUT: 'PUT',
};

export default class DestinationsApiService extends ApiService {
  get destinations() {
    return this._load({url: 'destinations'})
      .then(ApiService.parseResponse);
  }

  // async updateEvent(event) {
  //   const response = await this._load({
  //     url: `destinations/${event.id}`,
  //     method: Method.PUT,
  //     body: JSON.stringify(this.#adaptToServer(event)),
  //     headers: new Headers({'Content-Type': 'application/json'}),
  //   });

  //   const parsedResponse = await ApiService.parseResponse(response);

  //   return parsedResponse;
  // }



}
