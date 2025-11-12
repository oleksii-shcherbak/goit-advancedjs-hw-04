import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { fetchImages } from './js/pixabay-api.js';
import { createGalleryMarkup, clearGallery } from './js/render-functions.js';

const searchForm = document.querySelector('.form');
const galleryElement = document.querySelector('.gallery');
const loaderElement = document.querySelector('.loader-box');

let lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

searchForm.addEventListener('submit', handleSearch);

function handleSearch(event) {
  event.preventDefault();

  const searchQuery = event.target.elements.search.value.trim();

  if (searchQuery === '') {
    iziToast.warning({
      message: 'Please enter a search query',
      position: 'topRight',
    });
    return;
  }

  clearGallery(galleryElement);
  showLoader();

  fetchImages(searchQuery)
    .then(data => {
      hideLoader();

      if (data.hits.length === 0) {
        iziToast.error({
          message:
            'Sorry, there are no images matching your search query. Please try again!',
          position: 'topRight',
        });
        return;
      }

      const markup = createGalleryMarkup(data.hits);
      galleryElement.insertAdjacentHTML('beforeend', markup);
      lightbox.refresh();
    })
    .catch(error => {
      hideLoader();
      iziToast.error({
        message: 'Something went wrong. Please try again later.',
        position: 'topRight',
      });
      console.error('Error fetching images:', error);
    });

  event.target.reset();
}

function showLoader() {
  loaderElement.classList.remove('visually-hidden');
}

function hideLoader() {
  loaderElement.classList.add('visually-hidden');
}
