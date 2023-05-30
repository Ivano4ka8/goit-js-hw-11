import axios from 'axios';
export class ServiceForImages {

  #API_KEY = '36684005-bee5d5c8682e5aa73080486ab';
  #BASE_URL = 'https://pixabay.com/api/';

  constructor() {
    this.nameOfImage = '';
    this.page = 1;
  }

  getImages() {
    return axios
      .get(
        `${this.#BASE_URL}?key=${this.#API_KEY}&q=${this.nameOfImage}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=40`
      )
      .then(response => response)
      .then(({ data }) => {
        this.incrementPage();
        return data;
      });
  }

  incrementPage() {
    this.page += 1;
  }
  resetPage() {
    this.page = 1;
  }
  totalImages() {
    const numberOfImages = this.page * 40;
    return numberOfImages;
  }

  get name() {
    return this.nameOfImage;
  }

  set name(newName) {
    this.nameOfImage = newName;
  }
}
