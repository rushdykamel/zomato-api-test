import SearchController from './search.controller'
import searchTemplate from './search.html';
import 'angularjs-slider';
let searchModule = angular.module('Search', [ 'ui.router', 'rzModule' ]);

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