export default class OffersModel {
  constructor(offers) {
    this.offers = [...offers];
  }

  getOffers() {
    return this.offers;
  }

  getOffersByType(type) {
    const typeOffers = this.offers.filter((offer) => offer.type === type);

    return typeOffers.length > 0 ? typeOffers[0].offers : [];
  }

}
