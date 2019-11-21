import React, { Fragment, PureComponent } from 'react';
import PropTypes from 'prop-types';

import Modal from 'Components/Widgets/Modal';

const withModal = ({
  ariaLabel,
  modalContent,
  modalTitle,
  onModalClosed,
  shouldShowModal,
  type,
}) => (BaseComponent) => {
  class WithModal extends PureComponent {
    constructor(props) {
      super(props);

      this.state = { showModal: false };

      this.outsideClickListener = this.outsideClickListener.bind(this);
      this.closeModal = this.closeModal.bind(this);
    }

    closeModal() {
      this.setState({ showModal: false });
    }

    outsideClickListener(event) {
      event.preventDefault();
      const { showModal } = this.state;

      if (typeof shouldShowModal === 'function' ? shouldShowModal() : true) {
        event.stopPropagation();
        this.setState({ showModal: !showModal });
      }
    }

    render() {
      const { showModal } = this.state;

      const clonedModalContent = React.cloneElement(modalContent, {
        closeModal: this.closeModal,
      });

      return (
        <Fragment>
          <div onClickCapture={this.outsideClickListener}>{BaseComponent}</div>
          {showModal && (
            <Modal
              modalTitle={modalTitle}
              ariaLabel={ariaLabel}
              onClose={onModalClosed}
              type={type}
            >
              {clonedModalContent}
            </Modal>
          )}
        </Fragment>
      );
    }
  }

  return WithModal;
};

withModal.propTypes = {
  ariaLabel: PropTypes.string.isRequired,
  modalContent: PropTypes.node.isRequired,
  modalTitle: PropTypes.string.isRequired,
  onModalClosed: PropTypes.func,
  shouldShowModal: PropTypes.bool,
  type: PropTypes.string.isRequired,
};

withModal.defaultProps = {
  onModalClosed: null,
  shouldShowModal: null,
};

export default withModal;
