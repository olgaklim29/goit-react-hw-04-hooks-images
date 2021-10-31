import PropTypes from 'prop-types';

export default function ImageGalleryItem({ item }) {
  return (
    <li className="ImageGalleryItem">
      <img
        className="ImageGalleryItem-image"
        src={item.webformatURL}
        alt={item.tags}
        data-large={item.largeImageURL}
      />
    </li>
  );
}

ImageGalleryItem.propTypes = {
  item: PropTypes.object,
};