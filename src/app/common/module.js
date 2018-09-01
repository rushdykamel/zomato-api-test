import ZomatoApiService from '../common/zomatoApi.service';

let commonModule = angular.module('Common', []);

commonModule.service('zomatoApi', ZomatoApiService);

export default commonModule;