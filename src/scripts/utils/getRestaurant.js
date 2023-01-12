import { RESTAURANT_LIST_URL, DETAIL_RESTAURANT_ID, SEARCH_URL } from '@global/config';

const getRestaurant = {
  async list() {
    const response = await this.fetch(RESTAURANT_LIST_URL, { method: 'GET'});
    return response;
  },

  async detail(id) {
    const response = await this.fetch(DETAIL_RESTAURANT_ID + id, { method: 'GET' });
    return response;
  },

  async fetch(url, options) {
    const response = await fetch(url, options);
    const responseJson = await response.json();
    return responseJson;
  },

  async search(query) {
    const response = await fetch(SEARCH_URL + query);
    const responseJson = await response.json();
    return responseJson;
  }
};

export default getRestaurant;
