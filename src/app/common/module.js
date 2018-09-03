import ZomatoApiService from '../common/zomatoApi.service';

let commonModule = angular.module('Zomato.Common', []);

commonModule.service('Zomato.Common.ZomatoApi', ZomatoApiService);

// constants
commonModule.constant('API_KEY', 'fcb10dcf60d451a8535ae88b05fbf16f');
commonModule.constant('API_URL', 'https://developers.zomato.com/api/v2.1/');
commonModule.constant('CITY_ID', '297');

export default commonModule;