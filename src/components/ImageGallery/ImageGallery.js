import PropTypes from 'prop-types';
import { Component } from 'react';
import { pixabayApi } from '../../services/pixabayApi';
import ImageGalleryItem from '../ImageGalleryItem';
import Button from '../Button';
import Loader from '../Loader';

const newPixabayApi = new pixabayApi();

class ImageGalery extends Component {
  state = {
    searchResults: [],
    status: 'idle',
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.searchValue !== this.props.searchValue) {
      this.setState({ status: 'pending' });
      newPixabayApi.resetPage();
      newPixabayApi.searchQuery = this.props.searchValue;
      newPixabayApi
        .fetchImages()
        .then(searchResults => {
          this.setState({ searchResults: searchResults.hits, status: 'resolved' });
        })
        .catch(err => {
          console.log(err);
          this.setState({ status: 'rejected' });
        });
    }
    if (prevState.searchResults.length !== this.state.searchResults.length) {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      });
    }
  }

  handleClick = () => {
    newPixabayApi
      .fetchImages()
      .then(searchResults => {
        this.setState(prev => ({
          searchResults: [...prev.searchResults, ...searchResults.hits],
          status: 'resolved',
        }));
      })
      .catch(err => {
        console.log(err);
        this.setState({ status: 'rejected' });
      });
  };

  render() {
    const { status, searchResults } = this.state;
    const { handleClick } = this;
    const { openModal } = this.props;

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
            {this.state.searchResults.map(el => (
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
    if (status === 'regected') {
      return <p className="textNotification">Error!!!</p>;
    }
  }
}

export default ImageGalery;

ImageGalery.propTypes = {
  searchValue: PropTypes.string,
  openModal: PropTypes.func,
};