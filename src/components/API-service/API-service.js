import axios from 'axios';

function fetchAPI(searchQuery, page) {
  const API_KEY = '37124750-bb2205b7594ee961e8dd1b6b7';
  const BASE_URL = `https://pixabay.com/api/?key=${API_KEY}`;
  const URL = `${BASE_URL}&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=12`;

  return axios.get(URL);
}

export default fetchAPI;

// handleSubmit = async event => {
//   event.preventDefault();

//   const { searchQuery } = this.state;

//   if (searchQuery.trim() === '') {
//     return Notiflix.Notify.warning('Будь-ласка введіть запит!');
//   }

//   if (searchQuery === this.state.searchQuery) {
//     this.setState({
//       images: [],
//       page: 1,
//     });
//   }

//   this.setState({
//     isLoading: true,
//   });

//   try {
//     await this.fetchImages();
//   } catch (error) {
//     console.error(error);
//     this.setState({ error: 'Помилка при завантаженні зображень.' });
//   } finally {
//     this.setState({ isLoading: false });
//   }
// };
