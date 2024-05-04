import AbstractView from '../framework/view/abstract-view.js';
import { FilterType } from '../const.js';


function createFilterTemplate(currentFilter) {
  return (
    `<form class="trip-filters" action="#" method="get">
    <div class="trip-filters__filter">
      <input id="filter-everything" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${FilterType.EVERYTHING}" ${currentFilter === FilterType.EVERYTHING ? 'checked' : ''}>
      <label class="trip-filters__filter-label" for="filter-everything">Everything</label>
    </div>

    <div class="trip-filters__filter">
      <input id="filter-future" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${FilterType.FUTURE}" ${currentFilter === FilterType.FUTURE ? 'checked' : ''}>
      <label class="trip-filters__filter-label" for="filter-future">Future</label>
    </div>

    <div class="trip-filters__filter">
      <input id="filter-past" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${FilterType.PAST}" ${currentFilter === FilterType.PAST ? 'checked' : ''}>
      <label class="trip-filters__filter-label" for="filter-past">Past</label>
    </div>

    <button class="visually-hidden" type="submit">Accept filter</button>
  </form>`
  );
}

export default class FilterView extends AbstractView {
  #currentFilter = null;
  #handleFilterTypeChange = null;

  constructor({ currentFilter, onFilterTypeChange }) {
    super();
    this.#currentFilter = currentFilter;
    this.#handleFilterTypeChange = onFilterTypeChange;

    this.element.addEventListener('change', this.#onTypeChange);
  }

  get template() {
    return createFilterTemplate(this.#currentFilter);
  }

  #onTypeChange = (evt) => {
    evt.preventDefault();
    const filterType = this.element.querySelector('.trip-filters__filter-input:checked').value;
    this.#handleFilterTypeChange(filterType);
  };
}
