import { extend } from 'lodash';

class ZomatoApiService {
  constructor($http, API_KEY, API_URL, CITY_ID, $q) {
    extend(this, { $http, API_KEY, API_URL, CITY_ID, $q });
    
    this.apiOptions = {
      headers: {
        'user-key': this.API_KEY
      }
    };
  }

  getLookup() {

    // this mehtod can be used if we would like to load categories and cuisines from the API
    let deferred = this.$q.defer();
    let lookupRequests = [
      this.$http.get(`${this.API_URL}categories`, this.apiOptions),
      this.$http.get(`${this.API_URL}cuisines?city_id=${this.CITY_ID}`, this.apiOptions)
    ];

    this.$q.all(lookupRequests).then(resp => {
      deferred.resolve({
        categories: resp[0].data.categories,
        cuisines: resp[1].data.cuisines
      });
    }, deferred.reject);

    return deferred.promise;
  }

  search(categories, cuisines, start, count) {
    const queryParams = [
      `entity_id=${this.CITY_ID}`,
      `entity_type=city`,
      `category=${categories.join(',')}`,
      `cuisines=${cuisines.join(',')}`,
      `start=${start}`,
      `count=${count}`
    ];

    return this.$http.get(`${this.API_URL}search?${queryParams.join('&')}`, this.apiOptions)
  }
}

ZomatoApiService.$inject = ['$http', 'API_KEY', 'API_URL', 'CITY_ID', '$q'];

export default ZomatoApiService;