import { useState, useEffect } from 'react';
import { Wrapper } from './App.module';
import Modal from './Modal/Modal';
import { Api } from '../api/api';
import GlobalStyle from './GlobalStyle.module';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import Button from './Button/Button';

export default function App() {
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState('idle');
  const [loadMore, setLoadMore] = useState(null);
  const [largeImageUrl, setLargeImageUrl] = useState('');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!inputValue) return;

    setStatus('loading');
    setLoadMore(null);

    Api(inputValue, page)
      .then(e => {
        setImages(prevState => [...prevState, ...e.hits]);
        setStatus('idle');
        setLoadMore(12 - e.hits.length);
      })
      .catch(error => setError(error.message));
  }, [page, inputValue]);

  const getInputValue = fetchValue => {
    setInputValue(fetchValue);
    setPage(1);
    setImages([]);
    setLoadMore(null);
  };

  const handleLoalMore = () => {
    setPage(prevState => prevState.page + 1);
  };

  const handleLargeImageUrl = imgUtl => {
    setLargeImageUrl(imgUtl);
    toggleModal();
  };

  const toggleModal = () => {
    setShowModal(prevState => !prevState);
  };

  return (
    <Wrapper>
      <GlobalStyle />
      <Searchbar onSubmit={getInputValue} />
      <ImageGallery images={images} onClick={handleLargeImageUrl} />

      {status === 'loading' && <Loader />}
      {showModal && (
        <Modal imgUrl={largeImageUrl} onClose={toggleModal} status={status} />
      )}
      {loadMore === 0 && <Button onClick={handleLoalMore} />}
      {error && <p>Error{error}</p>}
    </Wrapper>
  );
}
