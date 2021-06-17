'use strict';

class SearchService {
  constructor(offers) {
    this._offers = offers;
  }

  async findAll(searchText) {
    return this._offers.filter((item) => item.title.includes(searchText));
  }

}

module.exports = SearchService;
