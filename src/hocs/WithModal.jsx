import Modal from 'Components/Modal';
import React, { PureComponent } from 'react';

const withModal = ({ modalContent, shouldShowModal, modalTitle, ariaLabel }) => (BaseComponent) => {
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
      const { showModal } = this.state;

      if (shouldShowModal()) {
        event.stopPropagation();
        this.setState({ showModal: !showModal });
      }
    }

    render() {
      const { showModal } = this.state;

      const clonedBaseComponent = React.cloneElement(BaseComponent, {
        onClickCapture: this.clickListener,
      });

      return (
        <div>
          {clonedBaseComponent}
          {showModal && (
            <Modal modalTitle={modalTitle} ariaLabel={ariaLabel} onClose={this.onModalClose}>
              {modalContent}
            </Modal>
          )}
        </div>
      );
    }
  }

  return WithModal;
};

export default withModal;
