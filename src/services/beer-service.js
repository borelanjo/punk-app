import axios from 'axios';

export default class BeerService {
  api = axios.create({
    baseURL: `https://api.punkapi.com/v2/beers`
  });

  findAll() {
    return this.api.get("");
  }

  findById(id) {
    return this.api.get(`/${id}`);
  }


}