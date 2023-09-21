import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css';

function ImageGallery({ images, openModal }) {
  return (
    <ul className={css.ImageGallery}>
      {images.map(image => {
        const { id, webformatURL, tags } = image;

        return (
          <ImageGalleryItem
            key={id}
            webformatURL={webformatURL}
            tags={tags}
            openModal={() => openModal(image)}
          />
        );
      })}
    </ul>
  );
}

export default ImageGallery;

// id - унікальний ідентифікатор
// webformatURL - посилання на маленьке зображення для списку карток
// largeImageURL - посилання на велике зображення для модального вікна
