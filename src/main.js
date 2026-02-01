import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from "simplelightbox";
// Додатковий імпорт стилів
import 'simplelightbox/dist/simple-lightbox.min.css';
import './css/styles.css';
import axios from "axios";
const API_KEY = '41917530-74216f8e6af2c90f64ec8c0b5';
const URL = "https://pixabay.com/api/";
const form = document.querySelector(".form-inline");
const containerEl = document.querySelector(".card-container")
const loadMoreBtn = document.querySelector(".label");
const preloader = document.getElementById("preloader");
const queryParams = {
    q: "",
    page: 1,
    maxPage: 0,
    per_page: 40,
};
let currentSearchQuery = "";
const hiddenClass = "is-hidden";
function hide(button) {
    button.classList.add(hiddenClass);
}

function show(button) {
    button.classList.remove(hiddenClass);
}

function enable(button, preloader) {
    preloader.classList.add(hiddenClass);
    button.disabled = false;
}

function disable(button, preloader) {
    preloader.classList.remove(hiddenClass);
    button.disabled = true;
}
function showLoadingIndicator() {
    containerEl.innerHTML = '<div class="loader"></div>';
}
function hideLoadingIndicator() {
    const loadingElement = containerEl.querySelector('.loader');
    if (loadingElement) {
        loadingElement.remove();
    }
}
form.addEventListener("submit", handleSearch);
async function handleSearch(event) {
    event.preventDefault();
    containerEl.innerHTML = "";
    const form = event.currentTarget;
    const picture = form.elements.picture.value.trim();
    currentSearchQuery = picture;
    queryParams.page = 1;
    if (picture === "" || picture == null) {
        iziToast.error({
            title: "Error",
            message: `❌Sorry, there are no images matching your search query. Please, try again!`,
        })
        containerEl.innerHTML = "";
        hide(loadMoreBtn);
        return;
    }
    showLoadingIndicator()
    try {
        const { hits, totalHits } = await serchPicture(picture);
        if (hits && hits.length > 0) {
            queryParams.maxPage = Math.ceil(totalHits / queryParams.per_page);
            createPictureMarkup(hits, containerEl)
            const lightbox = new SimpleLightbox('.card-container a', {
                captionsData: 'alt',
                captionPosition: 'bottom',
                captionDelay: 250,
            });
            lightbox.refresh();
            if (hits && hits.length > 0 && hits.length !== totalHits) {
                show(loadMoreBtn);
                loadMoreBtn.removeEventListener("click", handleLoadMore);
                loadMoreBtn.addEventListener("click", handleLoadMore);
            } else {
                hide(loadMoreBtn);
            }
        } else {
            containerEl.innerHTML = "";
            iziToast.error({
                title: "Error",
                message: `❌Sorry, there are no images matching your search query. Please, try again!`,
            })
            hide(loadMoreBtn);
        }
    }
    catch (err) {
        console.log(err);
    }
    finally {
        hideLoadingIndicator();
        form.reset()
    };
}
function serchPicture(picture, page = 1) {
    return axios.get(URL, {
        params: {
            key: API_KEY,
            q: picture,
            image_type: "photo",
            orientation: "horizontal",
            safesearch: true,
            per_page: 40,
            page,
        }
    }).then((res) => {
        return res.data;
    });
}
async function handleLoadMore() {
    queryParams.page += 1;
    disable(loadMoreBtn, preloader);
    try {
        const { hits } = await serchPicture(currentSearchQuery, queryParams.page)
        createPictureMarkup(hits, containerEl)
        const cardHeight = containerEl.querySelector('.picture-link').getBoundingClientRect().height;
        window.scrollBy({ top: cardHeight * 3, behavior: 'smooth' });
        const lightbox = new SimpleLightbox('.card-container a', {
            captionsData: 'alt',
            captionPosition: 'bottom',
            captionDelay: 250,
        });
        lightbox.refresh();
    } catch (err) {
        console.log(err);
    } finally {
        enable(loadMoreBtn, preloader);
        if (queryParams.page >= queryParams.maxPage) {
            hide(loadMoreBtn);
            iziToast.error({
                title: "Error",
                message: `"We're sorry, but you've reached the end of search results."`,
            })
            loadMoreBtn.removeEventListener("click", handleLoadMore);
        } else {
            show(loadMoreBtn);
            loadMoreBtn.removeEventListener("click", handleLoadMore);
            loadMoreBtn.addEventListener("click", handleLoadMore);
        }
    }
}
function createPictureMarkup(hits, containerEl) {
    const markup = hits.map(({ webformatURL, likes, views, comments, downloads, largeImageURL }) => `<a href="${largeImageURL}" class= "picture-link">
    <img src = "${webformatURL}">
    <div class= "picture-content">
        <div class= "picture-text">
            <span class= "picture-title">Likes</span>
            <span class= "picture-sub-title">${likes}</span>
        </div>
        <div class= "picture-text">
            <span class= "picture-title">Views</span>
            <span class= "picture-sub-title">${views}</span>
        </div>
        <div class= "picture-text">
            <span class= "picture-title">Comments</span>
            <span class= "picture-sub-title">${comments}</span>
        </div>
        <div class= "picture-text">
            <span class= "picture-title">Downloads</span>
            <span class= "picture-sub-title">${downloads}</span>
        </div>
    </div>
</a>`).join();
    containerEl.insertAdjacentHTML("beforeend", markup);
}