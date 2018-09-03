import { extend, debounce, isEqual } from 'lodash';

class SearchController {
  constructor($scope, $timeout, lookupData, searchService, PAGE_SIZE) {
    extend(this, { searchOptions: lookupData, searchService, PAGE_SIZE });
    this.resultMetaData = {};
    this.searchOptions = searchService.initSearchOptions(lookupData);
    this.isLoading = true;

    $scope.$watch(() => this.searchOptions, debounce(() => {
      
      // watch searchOptions, so trigger search function with any changes
      this.search(0);
    }, 500), true);

    $timeout(() => {
      
      // fix rzSlider rendering
      $scope.$broadcast('rzSliderForceRender');
    })
  }

  search(startIndex) {
    this.isLoading = true;
    this.searchService.search(this.searchOptions, startIndex, this.PAGE_SIZE).then(resp => {
      if (startIndex > 0) this.restaurants = this.restaurants.concat(resp.data.restaurants);
      else this.restaurants = resp.data.restaurants;

      // can load more only if there is more data to fetch and before reaching the API limit (100 records)
      const canLoadMore = (resp.data.results_start + this.PAGE_SIZE < resp.data.results_found) && (resp.data.results_start + this.PAGE_SIZE < 100);

      this.resultMetaData = {
        results_found: resp.data.results_found,
        results_start: resp.data.results_start,
        results_shown: resp.data.results_shown,
        canLoadMore: canLoadMore
      };
      this.isLoading = false;
    });
  }

  loadMoreResults() {
    this.search(this.resultMetaData.results_start + this.PAGE_SIZE);
  }

  setSelectedRestaurant(restaurant) {
    this.selectedRestaurant = restaurant;
  }

}

SearchController.$inject = ['$scope', '$timeout', 'lookupData', 'Zomato.Search.SearchService', 'PAGE_SIZE'];

export default SearchController;