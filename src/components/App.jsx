import { Component } from 'react';

import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';
import fetchAPI from './API-service/API-service';

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

  componentDidUpdate(prevProps, prevState) {
    if (prevState.page !== this.state.page) {
      this.fetchImages();
    }
  }

  queryOnChange = value => {
    this.setState({
      searchQuery: value,
    });
  };

  loadMoreImages = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  fetchImages = async () => {
    const { searchQuery, page } = this.state;

    try {
      const response = await fetchAPI(searchQuery, page);
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

  handleSubmit = searchQuery => {
    if (searchQuery === this.state.searchQuery) {
      alert('wrong query');
      return;
    }
    this.setState({
      images: [],
      page: 1,
      searchQuery,
    });
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
          onSubmit={this.handleSubmit}
          onChange={this.queryOnChange}
          searchQuery={searchQuery}
          // onFetch={this.fetchImages}
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
