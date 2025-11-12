import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { fetchImages } from './js/pixabay-api.js';
import { createGalleryMarkup, clearGallery } from './js/render-functions.js';

const searchForm = document.querySelector('.form');
const galleryElement = document.querySelector('.gallery');
const loaderElement = document.querySelector('.loader-box');
const loadMoreBtn = document.querySelector('.load-more-btn');

let lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

let currentPage = 1;
let currentQuery = '';
let totalHits = 0;
const perPage = 15;

searchForm.addEventListener('submit', handleSearch);
loadMoreBtn.addEventListener('click', handleLoadMore);

async function handleSearch(event) {
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
  hideLoadMoreBtn();
  currentPage = 1;
  currentQuery = searchQuery;

  await loadImages();

  event.target.reset();
}

async function handleLoadMore() {
  currentPage += 1;
  await loadImages();
  smoothScroll();
}

async function loadImages() {
  showLoader();

  try {
    const data = await fetchImages(currentQuery, currentPage, perPage);
    hideLoader();

    if (data.hits.length === 0) {
      iziToast.error({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
      });
      return;
    }

    totalHits = data.totalHits;
    const markup = createGalleryMarkup(data.hits);
    galleryElement.insertAdjacentHTML('beforeend', markup);
    lightbox.refresh();

    const totalPages = Math.ceil(totalHits / perPage);

    if (currentPage >= totalPages) {
      hideLoadMoreBtn();
      if (totalPages > 1) {
        iziToast.info({
          message: "We're sorry, but you've reached the end of search results.",
          position: 'topRight',
        });
      }
    } else {
      showLoadMoreBtn();
    }
  } catch (error) {
    hideLoader();
    iziToast.error({
      message: 'Something went wrong. Please try again later.',
      position: 'topRight',
    });
    console.error('Error fetching images:', error);
  }
}

function showLoader() {
  loaderElement.classList.remove('visually-hidden');
}

function hideLoader() {
  loaderElement.classList.add('visually-hidden');
}

function showLoadMoreBtn() {
  loadMoreBtn.classList.remove('visually-hidden');
}

function hideLoadMoreBtn() {
  loadMoreBtn.classList.add('visually-hidden');
}

function smoothScroll() {
  const { height: cardHeight } = document
    .querySelector('.gallery-item')
    .getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
