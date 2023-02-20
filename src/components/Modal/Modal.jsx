import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { ModalBackdrop, ModalContent, ModalImg, Icon } from './Modal.module';
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modal-root');

export default function Modal({ imgUrl, onClose }) {
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });

  const handleKeyDown = event => {
    if (event.code === 'Escape') {
      onClose();
    }
  };

  const handleBackdropClick = event => {
    if (event.currentTarget === event.target) {
      onClose();
    }
  };

  return createPortal(
    <ModalBackdrop onClick={handleBackdropClick}>
      <ModalContent>
        <Icon
          className="fa fa-times"
          aria-hidden="true"
          onClick={() => onClose()}
        ></Icon>
        <ModalImg src={imgUrl} alt="" />
      </ModalContent>
    </ModalBackdrop>,
    modalRoot
  );
}

Modal.propTypes = {
  imgUrl: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};
