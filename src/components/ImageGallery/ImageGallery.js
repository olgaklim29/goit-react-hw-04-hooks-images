import PropTypes from 'prop-types';
import { useState, useEffect, useRef } from 'react';
import { pixabayApi } from '../../services/pixabayApi';
import ImageGalleryItem from '../ImageGalleryItem';
import Button from '../Button';
import Loader from '../Loader';

const newPixabayApi = new pixabayApi();

const ImageGalery = ({ searchValue, openModal }) => {
  const [searchResults, setSearchResults] = useState([]);
  const [status, setStatus] = useState('idle');
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    setStatus('pending');
    newPixabayApi.resetPage();
    newPixabayApi.searchQuery = searchValue;
    newPixabayApi
      .fetchImages()
      .then(searchResults => {
        setSearchResults(searchResults.hits);
        setStatus('resolved');
      })
      .catch(err => {
        console.log(err);
        setStatus('rejected');
      });
  }, [searchValue]);

  useEffect(() => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  }, [searchResults.length]);

  const handleClick = () => {
    newPixabayApi
      .fetchImages()
      .then(results => {
        setSearchResults(prevResults => [...prevResults, ...results.hits]);
        setStatus('resolved');
      })
      .catch(err => {
        console.log(err);
        setStatus('rejected');
      });
  };

  if (status === 'idle') {
    return <div></div>;
  }
  if (status === 'pending') {
    return <Loader />;
  }
  if (status === 'resolved') {
    return (
      <>
        <ul className="ImageGallery" onClick={openModal}>
          {searchResults.map(el => (
            <ImageGalleryItem key={el.id} item={el} />
          ))}
        </ul>
        {searchResults.length !== 0 ? (
          <Button handleClick={handleClick} />
        ) : (
          <p className="textNotification">Sorry, I didn't find anything</p>
        )}
      </>
    );
  }
  if (status === 'rejected') {
    return <p className="textNotification">Error!</p>;
  }
};

export default ImageGalery;

ImageGalery.propTypes = {
  searchValue: PropTypes.string,
  openModal: PropTypes.func,
};