import React, { Fragment, PureComponent } from 'react';

import Modal from 'Components/Modal';

const withModal = ({ modalContent, shouldShowModal = null, modalTitle, ariaLabel }) => (
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
      const { showModal } = this.state;

      if (typeof shouldShowModal === 'function' ? shouldShowModal() : true) {
        event.stopPropagation();
        this.setState({ showModal: !showModal });
      }
    }

    render() {
      const { showModal } = this.state;

      const attrs = { onClickCapture: this.clickListener };
      const clonedBaseComponent =
        typeof BaseComponent === 'string' ? (
          <div {...attrs}>{BaseComponent}</div>
        ) : (
          React.cloneElement(BaseComponent, attrs)
        );

      const clonedContent = React.cloneElement(modalContent, { closeModal: this.onModalClose });

      return (
        <Fragment>
          {clonedBaseComponent}
          {showModal && (
            <Modal modalTitle={modalTitle} ariaLabel={ariaLabel} onClose={this.onModalClose}>
              {clonedContent}
            </Modal>
          )}
        </Fragment>
      );
    }
  }

  return WithModal;
};

export default withModal;
