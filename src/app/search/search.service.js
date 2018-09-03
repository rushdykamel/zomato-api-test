import { extend, filter, map } from 'lodash';
import categories from './_lookup_data/categories.json';
import cuisines from './_lookup_data/cuisines.json';

class SearchService {
  constructor(zomatoApi) {
    extend(this, { zomatoApi })
  }

  getLookup() {

    // if we would like to get lookup data (categories and cuisines) from the API then we should do:
    // return this.zomatoApi.getLookup();

    // otherwise, load static one from JSON files
    return { categories, cuisines };
  }

  initSearchOptions(lookupData) {
    let searchOptions = {};
    extend(searchOptions, lookupData);

    // rating and cost options configuration
    searchOptions.rating = {
      minValue: 0,
      maxValue: 5,
      noSwitching: true,
      options: {
        floor: 0,
        ceil: 5,
        noSwitching: true
      }
    };

    searchOptions.cost = {
      minValue: 1,
      maxValue: 4,
      options: {
        floor: 1,
        ceil: 4,
        noSwitching: true,
        translate: value => {

          // translate slider display value to show $, $$,..., etc
          let arr = [];
          arr[value] = '';
          return arr.join('$');
        }
      }
    };

    return searchOptions;
  }

  search(searchOptions, start, count) {

    // get selected categories and cuisines from search options
    const selectedCategories = map(filter(searchOptions.categories,
      category => category.categories.isSelected), 'categories.id');
    const selectedCuisines = map(filter(searchOptions.cuisines,
      cuisine => cuisine.cuisine.isSelected), 'cuisine.cuisine_id');

    return this.zomatoApi.search(selectedCategories, selectedCuisines, start, count);
  }
}

SearchService.$inject = ['Zomato.Common.ZomatoApi'];

export default SearchService;