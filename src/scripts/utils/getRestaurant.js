import { RESTAURANT_LIST_URL } from '../global/config';

const getRestaurant = {
  async list() {
    const response = await fetch(RESTAURANT_LIST_URL, { method: 'GET' });
    const list = await response.json();

    console.info(list, 'getRestaurant');

    return list;
  },
};

export default getRestaurant;
