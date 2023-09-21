import css from './ImageGalleryItem.module.css';

function ImageGalleryItem({ webformatURL, tags, openModal }) {
  return (
    <li className={css.ImageGalleryItem}>
      <img
        src={webformatURL}
        alt={tags}
        className={css.ImageGalleryItemImage}
        onClick={openModal}
      />
    </li>
  );
}

export default ImageGalleryItem;
