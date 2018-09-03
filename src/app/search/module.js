import SearchController from './search.controller'
import SearchService from './search.service'

import searchTemplate from './search.html';
import 'angularjs-slider';

let searchModule = angular.module('Zomato.Search', [ 'ui.router', 'rzModule' ]);

searchModule.config(['$stateProvider', $stateProvider => {
  $stateProvider.state('zomato.search', {
    url: 'search',
    template: searchTemplate,
    controller: SearchController,
    controllerAs: 'vm',
    resolve: {
      lookupData: ['Zomato.Search.SearchService', searchService => {
        return searchService.getLookup();
      }]
    }
  });
}]);

searchModule.controller('Zomato.Search.SearchController', SearchController);
searchModule.service('Zomato.Search.SearchService', SearchService);
searchModule.constant('PAGE_SIZE', 20);

export default searchModule;