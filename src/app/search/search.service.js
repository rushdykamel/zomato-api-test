import { extend, filter, map } from 'lodash';
import categories from './_lookup_data/categories.json';
import cuisines from './_lookup_data/cuisines.json';

class SearchService {
  constructor(zomatoApi) {
    extend(this, { zomatoApi })
  }

  getLookup() {

    // if we would like to get lookup data (categories and cuisines) from the API then do:
    // return this.zomatoApi.getLookup();

    // otherwise, load them from JSON files
    return { categories, cuisines };
  }

  search(searchOptions) {
    // get selected categories and cuisines
    const selectedCategories = map(filter(searchOptions.categories,
      category => category.categories.isSelected), 'categories.id');
    const selectedCuisines = map(filter(searchOptions.cuisines,
      cuisine => cuisine.cuisine.isSelected), 'cuisine.cuisine_id');

    return this.zomatoApi.search(selectedCategories, selectedCuisines);
  }
}

SearchService.$inject = ['Zomato.Common.ZomatoApi'];

export default SearchService;