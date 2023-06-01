import axios from 'axios';
export class ServiceForImages {
  #API_KEY = '36684005-bee5d5c8682e5aa73080486ab';
  #BASE_URL = 'https://pixabay.com/api/';

  constructor() {
    this.nameOfImage = '';
  }

  getImages(page) {
    return axios.get(`${this.#BASE_URL}`, {
      params: {
        key: this.#API_KEY,
        q: this.nameOfImage,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: 'true',
        page,
        per_page: 40,
      },
    });
  }

  get name() {
    return this.nameOfImage;
  }

  set name(newName) {
    this.nameOfImage = newName;
  }
}
