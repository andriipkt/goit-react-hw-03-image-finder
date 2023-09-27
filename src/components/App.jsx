import { Component } from 'react';
import Notiflix from 'notiflix';

import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';
import fetchAPI from '../API-service/API-service';

export class App extends Component {
  state = {
    query: '',
    images: [],
    page: 1,
    error: null,
    isLoading: false,
    showModal: false,
    modalImage: null,
    loadMore: true,
  };

  componentDidUpdate(_, prevState) {
    if (
      this.state.page !== prevState.page ||
      this.state.query !== prevState.query
    ) {
      this.fetchImages();
    }
  }

  loadMoreImages = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  fetchImages = async () => {
    const { query, page } = this.state;
    this.setState({ isLoading: true });

    try {
      const response = await fetchAPI(query, page);

      const { hits, totalHits } = response.data;

      if (hits.length === 0) {
        return Notiflix.Notify.failure('Нічого не знайдемо за Вашим запитом');
      }

      this.setState(prevState => ({
        images: [...prevState.images, ...hits],
        error: null,
        loadMore: prevState.page < Math.ceil(totalHits / 12),
      }));
    } catch (error) {
      console.error(error);
      this.setState({ error: 'Помилка при завантаженні зображень.' });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  handleSubmit = searchQuery => {
    if (searchQuery === this.state.query) {
      return Notiflix.Notify.warning('Будь-ласка введіть інший запит!');
    }
    this.setState({
      images: [],
      page: 1,
      query: searchQuery,
    });
  };

  openModal = image => {
    this.setState({ showModal: true, modalImage: image });
  };

  closeModal = () => {
    this.setState({ showModal: false, modalImage: '' });
  };

  render() {
    const { images, error, isLoading, showModal, modalImage, loadMore } =
      this.state;

    return (
      <div className="App">
        <Searchbar onSubmit={this.handleSubmit} />
        {error && <h2>{error}</h2>}

        <ImageGallery images={images} openModal={this.openModal} />

        {isLoading && <Loader />}

        {loadMore && images.length > 0 && !isLoading && (
          <Button onClick={this.loadMoreImages} />
        )}

        {showModal && <Modal image={modalImage} onClose={this.closeModal} />}
      </div>
    );
  }
}
