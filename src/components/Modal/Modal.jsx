/* eslint-disable react/forbid-prop-types, no-return-assign */

import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';

import ModalContent from './ModalContent';
import styles from './styles.scss';

const addPageClass = () => {
  document.querySelector('html').classList.add(styles.scrolling);
};

const removePageClass = () => {
  document.querySelector('html').classList.remove(styles.scrolling);
};

class Modal extends Component {
  static propTypes = {
    ariaLabel: PropTypes.string.isRequired,
    cancel: PropTypes.bool,
    children: PropTypes.object.isRequired,
    modalTitle: PropTypes.string,
    onClose: PropTypes.func,
  };

  static defaultProps = {
    cancel: false,
    modalTitle: '',
    onClose: () => {},
  };

  constructor(props) {
    super(props);

    addPageClass();
    this.state = { isOpen: true };

    this.buttonRef = React.createRef();
    this.modalRef = React.createRef();
  }

  componentWillUnmount() {
    removePageClass();
  }

  onClickAway = (e) => {
    this.setState({ isOpen: false });
    if (this.modalNode && this.modalNode.contains(e.target)) return;
    this.closeModal();
  };

  closeModal = () => {
    const { onClose } = this.props;

    removePageClass();
    this.setState({ isOpen: false });
    onClose();
  };

  render() {
    const { isOpen } = this.state;
    const { ariaLabel, cancel, children, modalTitle } = this.props;

    return (
      <Fragment>
        {isOpen && (
          <ModalContent
            ariaLabel={ariaLabel}
            onClickAway={this.onClickAway}
            buttonRef={this.buttonRef}
            modalRef={this.modalRef}
            modalTitle={modalTitle}
            content={children}
            onClose={this.closeModal}
            cancel={cancel}
          />
        )}
      </Fragment>
    );
  }
}

export default Modal;
