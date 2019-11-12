import React, { Fragment, PureComponent } from 'react';
import PropTypes from 'prop-types';

import Modal from 'Components/Widgets/Modal';

const withModal = ({ ariaLabel, modalContent, modalTitle, shouldShowModal, type }) => (
  BaseComponent,
) => {
  class WithModal extends PureComponent {
    constructor(props) {
      super(props);

      this.state = { showModal: false };

      this.clickListener = this.clickListener.bind(this);
      this.onModalClose = this.onModalClose.bind(this);
    }

    onModalClose() {
      this.setState({ showModal: false });
    }

    clickListener(event) {
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
        closeModal: this.onModalClose,
      });

      return (
        <Fragment>
          <div onClickCapture={this.clickListener}>{BaseComponent}</div>
          {showModal && (
            <Modal
              modalTitle={modalTitle}
              ariaLabel={ariaLabel}
              onClose={this.onModalClose}
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
  shouldShowModal: PropTypes.bool,
  type: PropTypes.string.isRequired,
};

withModal.defaultProps = {
  shouldShowModal: null,
};

export default withModal;
