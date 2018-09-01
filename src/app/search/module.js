import SearchController from './search.controller'
import searchTemplate from './search.html';

let searchModule = angular.module('Search', [ 'ui.router' ]);

searchModule.config(['$stateProvider', $stateProvider => {
  $stateProvider.state('zomato.search', {
    url: 'search',
    template: searchTemplate,
    controller: SearchController,
    controllerAs: 'vm'
  });
}]);

searchModule.controller('Search.SearchController', SearchController);

export default searchModule;