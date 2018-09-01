class SearchController {
  constructor() {
    this.rating = {
      minValue: 0,
      maxValue: 5,
      options: {
        floor: 0,
        ceil: 5,
        noSwitching: true
      }
    };

    this.price = {
      minValue: 1,
      maxValue: 4,
      options: {
        floor: 1,
        ceil: 4,
        noSwitching: true,
        translate: value => {
          let arr = [];
          arr[value] = '';
          return arr.join('$');
        }
      }
    };
  }
}

SearchController.$inject = [];

export default SearchController;