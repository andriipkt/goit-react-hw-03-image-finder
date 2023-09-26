import axios from 'axios';

function fetchAPI(searchQuery, page) {
  const API_KEY = '37124750-bb2205b7594ee961e8dd1b6b7';
  const BASE_URL = `https://pixabay.com/api/?key=${API_KEY}`;
  const URL = `${BASE_URL}&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=12`;

  return axios.get(URL);
}

export default fetchAPI;
