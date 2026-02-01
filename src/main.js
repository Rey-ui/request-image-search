import searchPictures from './js/pixabay-api.js';
import {
  hideLoader,
  showLoader,
  clearGallery,
  createMurkap,
} from './js/render-functions.js';
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
// Додатковий імпорт стилів
import 'simplelightbox/dist/simple-lightbox.min.css';

const formEl = document.querySelector('.form');
const listEl = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');
const preLoader = document.querySelector('.pre-loader');
const queryParams = {
  page: 1,
  query: '',
  maxPage: 0,
  per_page: 15,
};
const lightbox = new SimpleLightbox('.gallery .gallery__item a', {
  captionsData: 'alt',
  captionPosition: 'bottom',
  captionDelay: 250,
});

formEl.addEventListener('submit', handleSearch);

async function handleSearch(e) {
  e.preventDefault();
  queryParams.page = 1;
  const form = e.currentTarget;
  const imageValue = form.elements.searchText.value.trim();
  queryParams.query = imageValue;
  clearGallery(listEl);
  if (!imageValue) {
    iziToast.error({
      title: 'Error',
      message: `❌Enter the text`,
    });
    return;
  }
  showLoader();
  loadMoreBtn.classList.add('hidden');
  try {
    const { hits, totalHits } = await searchPictures(queryParams);
    queryParams.maxPage = Math.ceil(totalHits / queryParams.per_page);
    if (!hits || hits.length === 0) {
      clearGallery(listEl);
      iziToast.error({
        title: 'Error',
        message: `❌Sorry, there are no images matching your search query. Please, try again!`,
      });
    } else {
      createMurkap(hits, listEl);
      lightbox.refresh();
      if (hits.length > 0 && totalHits != hits.length) {
        showLoadMoreButton();
      } else {
        hideLoadMoreButton();
      }
    }
  } catch (err) {
    console.error(err);
    return err;
  } finally {
    form.reset();
    hideLoader();
  }
}
async function handleLoadMore() {
  queryParams.page += 1;
  showPreLoader();
  try {
    const { hits } = await searchPictures(queryParams);

    createMurkap(hits, listEl);
    const cardHeight = listEl
      .querySelector('.gallery__item-link')
      .getBoundingClientRect().height;
    window.scrollBy({ top: cardHeight * 3, behavior: 'smooth' });
    lightbox.refresh();
  } catch (err) {
    console.error(err);
    return err;
  } finally {
    hidePreLoader();
    if (queryParams.page >= queryParams.maxPage) {
      iziToast.error({
        title: 'Message',
        message: `We're sorry, but you've reached the end of search results.
`,
      });
      hideLoadMoreButton();
    }
  }
}
function showPreLoader() {
  loadMoreBtn.disabled = true;
  preLoader.classList.remove('hidden');
}
function hidePreLoader() {
  loadMoreBtn.disabled = false;
  preLoader.classList.add('hidden');
}
function showLoadMoreButton() {
  loadMoreBtn.classList.remove('hidden');
  loadMoreBtn.addEventListener('click', handleLoadMore);
}
function hideLoadMoreButton() {
  loadMoreBtn.classList.add('hidden');
  loadMoreBtn.removeEventListener('click', handleLoadMore);
}
