import angular from 'angular';
import Common from './common/module';
import Search from './search/module';
import '@uirouter/angularjs';
import '@uirouter/core';
import '../styles/index.less'

angular.module('Zomato', [
  Search.name,
  Common.name
]).config(['$locationProvider', '$stateProvider', '$urlRouterProvider',
  ($locationProvider, $stateProvider, $urlRouterProvider) => {
    $locationProvider.hashPrefix('');
    $stateProvider.state('zomato', {
      url: '/',
      absolute: true,
      redirectTo: 'zomato.search'
    }).state('404', {
      url: '/error-404',
      template: '<h3>The requested page not found!</h3>'
    });

    $urlRouterProvider.otherwise(($injector) => {

      // handle other urls
      var state = $injector.get('$state');
      var location = $injector.get('$location');
      if (!location.url()) {
        return state.go('zomato');
      }

      state.go('404');
    });
  }]);
