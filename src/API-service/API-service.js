import axios from 'axios';

const API_KEY = '37124750-bb2205b7594ee961e8dd1b6b7';
axios.defaults.baseURL = 'https://pixabay.com/api/';

function fetchAPI(searchQuery, page) {
  const params = {
    key: API_KEY,
    q: searchQuery,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    page: page,
    per_page: 12,
  };

  return axios.get('', { params });
}

export default fetchAPI;
