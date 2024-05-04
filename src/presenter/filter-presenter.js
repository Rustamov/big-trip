import { render } from '../framework/render.js';

import FilterView from '../view/filter-view.js';

export default class FilterPresenter {
  #filterContainer = null;
  #filterModel = null;

  #filterComponent = null;

  constructor({ filterContainer, filterModel }) {
    this.#filterContainer = filterContainer;
    this.#filterModel = filterModel;


    // this.#eventsModel.addObserver(this.#handleModelEvent);
  }

  init() {
    this.#renderFilter();
  }

  get filter() {
    // switch (this.#currentSortType) {
    //   case SortType.DAY:
    //     return [...this.#eventsModel.events].sort(sortEventsByDay);

    //   case SortType.TIME:
    //     return [...this.#eventsModel.events].sort(sortEventsByTime);

    //   case SortType.PRICE:
    //     return [...this.#eventsModel.events].sort(sortEventsByPrice);
    // }

    return this.#filterModel.filter;
  }

  #renderFilter = () => {
    this.#filterComponent = new FilterView({
      currentFilter: this.filter,
      onFilterTypeChange: this.#handleFilterTypeChange
    });

    render(this.#filterComponent, this.#filterContainer);

  }

  #handleFilterTypeChange = (filterType) => {
    console.log(filterType);
    if (this.#filterModel.filter === filterType) {
      return;
    }

    this.#filterModel.setFilter('11', filterType);
  };
}
