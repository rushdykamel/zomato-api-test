import { extend, debounce, isEqual } from 'lodash';

class SearchController {
  constructor($scope, $timeout, lookupData, searchService) {
    extend(this, { searchOptions: lookupData });

    this.searchOptions.rating = {
      minValue: 0,
      maxValue: 5,
      noSwitching: true,
      options: {
        floor: 0,
        ceil: 5,
        noSwitching: true
      }
    };

    this.searchOptions.cost = {
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

    $scope.$watch(() => this.searchOptions, debounce(() => {
      // watch searchOptions, so trigger search function with any changes
      searchService.search(this.searchOptions).then(resp => {
        this.restaurants = resp.data.restaurants;
      });
    }, 500), true);

    $timeout(function() {
      $scope.$broadcast('rzSliderForceRender');
    })
  }

  setSelectedRestaurant(restaurant) {
    this.selectedRestaurant = restaurant;
  }

}

SearchController.$inject = ['$scope', '$timeout', 'lookupData', 'Zomato.Search.SearchService'];

export default SearchController;