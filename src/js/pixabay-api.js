import axios from 'axios';
const API_KEY = '41917530-74216f8e6af2c90f64ec8c0b5';
async function searchPictures({ query, per_page, page }) {
  const responce = await axios.get(`https://pixabay.com/api`, {
    params: {
      key: API_KEY,
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      per_page,
      page,
    },
  });
  return responce.data;
}
export default searchPictures;
