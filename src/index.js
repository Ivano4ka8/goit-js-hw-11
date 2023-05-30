import Notiflix from 'notiflix';
import simpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import refs from './js/refs';
import { scroll } from './js/scroll';
import { ServiceForImages } from './js/classAPI';

const serviceForImages = new ServiceForImages();

refs.formEl.addEventListener('submit', onSubmit);
refs.btnLoadMore.addEventListener('click', onLoadMore);

async function onSubmit(event) {
  event.preventDefault();

  refs.galleryEl.innerHTML = '';
  refs.btnLoadMore.classList.add('is-hidden');

  serviceForImages.name = event.target.elements.searchQuery.value.trim();

  if (serviceForImages.name.trim() === '') {
    return Notiflix.Notify.info("String coudn't be empty. Please enter a word");
  }

  serviceForImages.resetPage();

  try {
    const data = await serviceForImages.getImages();
    createMarkup(data.hits);
    Notiflix.Notify.info(`Hooray! We found ${data.totalHits} images.`);
  } catch (error) {
    console.log(error);
  }
}

async function onLoadMore() {
  try {
    const data = await serviceForImages.getImages();
    createMarkup(data.hits);

    scroll(refs.galleryEl);

    createMarkup(data.hits).refresh();
    refs.btnLoadMore.classList.remove('is-hidden');

    if (serviceForImages.totalImages() > data.totalHits) {
      Notiflix.Notify.info(
        "We're sorry, but you've reached the end of search results."
      );
      refs.btnLoadMore.classList.add('is-hidden');
      return;
    }
  } catch (error) {
    console.log(error);
  }
}

function createMarkup(data) {
  if (data.length === 0) {
    Notiflix.Notify.info(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    refs.btnLoadMore.classList.add('is-hidden');
    return;
  }
  let markup = data
    .map(
      image => `<li class="photo-card list">
      <a href = "${image.largeImageURL}" class = "photo-link link">
       <img class = "img" src="${image.webformatURL}" alt="${image.tags}" loading="lazy" width = "360p" height = "300" />
    <div class="info">
      <p class="info-item">
        <b>Likes</b>${image.likes}
      </p>
      <p class="info-item">
        <b>Views</b> ${image.views}
      </p>
      <p class="info-item">
        <b>Comments</b>${image.comments}
      </p>
      <p class="info-item">
        <b>Downloads</b>${image.downloads}
      </p>
    </div>
    </a>
  </li>`
    )
    .join('');
  refs.btnLoadMore.classList.remove('is-hidden');

  refs.galleryEl.insertAdjacentHTML('beforeend', markup);

  markup = new simpleLightbox('.photo-card a', {
    captionsData: 'alt',
    captionDelay: 250,
  });
  return markup;
}
