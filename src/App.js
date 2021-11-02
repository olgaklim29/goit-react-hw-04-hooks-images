import { useState } from 'react';
import './App.css';
import ImageGalery from './components/ImageGallery';
import Searchbar from './components/Searchbar/';
import Modal from './components/Modal/';

function App() {
  const [searchValue, setSearchValue] = useState(' ');
  const [showModal, setShowModal] = useState(false);
  const [modalImg, setModalImg] = useState('');

  const getSearchValues = searchValue => setSearchValue(searchValue);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const openModal = e => {
    const { dataset, nodeName } = e.target;

    if (nodeName === 'IMG') {
      setModalImg(dataset.large);
      setShowModal(!showModal);
    }
  };

  return (
    <div className="App">
      <Searchbar getFormData={getSearchValues} />
      <ImageGalery searchValue={searchValue} openModal={openModal} />
      {showModal && (
        <Modal onClose={toggleModal}>
          <img src={modalImg} alt="" />
        </Modal>
      )}
    </div>
  );
}

export default App;