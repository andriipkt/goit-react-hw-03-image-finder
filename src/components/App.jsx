import { Component } from 'react';
import axios from 'axios';
import Notiflix from 'notiflix';

import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';

export class App extends Component {
  state = {
    searchQuery: '',
    images: [],
    page: 1,
    error: null,
    isLoading: false,
    showModal: false,
    modalImage: '',
  };

  handleInputChange = event => {
    const { value } = event.target;
    this.setState({ searchQuery: value });
  };

  loadMoreImages = () => {
    this.setState(
      prevState => ({
        page: prevState.page + 1,
      }),
      this.fetchImages
    );
  };

  fetchImages = async () => {
    const { searchQuery, page } = this.state;
    const API_KEY = '37124750-bb2205b7594ee961e8dd1b6b7';
    const BASE_URL = `https://pixabay.com/api/?key=${API_KEY}`;
    const URL = `${BASE_URL}&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=12`;

    try {
      const response = await axios.get(URL);
      this.setState(prevState => ({
        images: [...prevState.images, ...response.data.hits],
        error: null,
      }));
    } catch (error) {
      console.error(error);
      this.setState({ error: 'Помилка при завантаженні зображень.' });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  handleSubmit = async event => {
    event.preventDefault();

    const { searchQuery } = this.state;

    if (searchQuery.trim() === '') {
      return Notiflix.Notify.warning('Будь-ласка введіть запит!');
    }

    if (searchQuery === this.state.searchQuery) {
      this.setState({
        images: [],
        page: 1,
      });
    }

    this.setState({
      isLoading: true,
    });

    try {
      await this.fetchImages();
    } catch (error) {
      console.error(error);
      this.setState({ error: 'Помилка при завантаженні зображень.' });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  openModal = image => {
    this.setState({ showModal: true, modalImage: image });
  };

  closeModal = () => {
    this.setState({ showModal: false, modalImage: '' });
  };

  render() {
    const { searchQuery, images, error, isLoading, showModal, modalImage } =
      this.state;

    return (
      <div className="App">
        <Searchbar
          handleSubmit={this.handleSubmit}
          onChange={this.handleInputChange}
          searchQuery={searchQuery}
        />
        {error && <p>{error}</p>}

        <ImageGallery images={images} openModal={this.openModal} />

        {isLoading && <Loader />}

        {images.length > 0 && !isLoading && (
          <Button onClick={this.loadMoreImages} />
        )}

        {showModal && <Modal image={modalImage} onClose={this.closeModal} />}
      </div>
    );
  }
}
