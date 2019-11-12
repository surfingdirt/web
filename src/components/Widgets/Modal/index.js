/* eslint-disable react/forbid-prop-types, no-return-assign */

import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';

import ModalContent from './ModalContent';
import styles from './styles.scss';

const HERO = 'hero';
const STANDARD = 'standard';

export const modalTypes = {
  HERO,
  STANDARD,
};

const typeMapping = {
  [HERO]: 'heroModal',
  [STANDARD]: 'standardModal',
};

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
    type: (props, propName, componentName) => {
      const type = props[propName];
      if (!type) {
        return new Error(`Empty type set for component '${componentName}'`);
      }

      if (!Object.keys(typeMapping).includes(type)) {
        return new Error(`Invalid type set for component '${componentName}': '${type}'`);
      }

      return undefined;
    },
  };

  static defaultProps = {
    cancel: false,
    modalTitle: '',
    onClose: null,
  };

  constructor(props) {
    super(props);
    const { modalTitle } = this.props;
    this.state = { isOpen: true, modalTitle };

    this.buttonRef = React.createRef();
    this.modalRef = React.createRef();
  }

  componentDidMount() {
    addPageClass();
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
    if (onClose) {
      onClose();
    }
  };

  render() {
    const { isOpen } = this.state;
    const { ariaLabel, cancel, children, type } = this.props;
    const { modalTitle } = this.state;
    const typeClassName = typeMapping[type];

    return (
      <Fragment>
        {isOpen && (
          <ModalContent
            ariaLabel={ariaLabel}
            onClickAway={this.onClickAway}
            buttonRef={this.buttonRef}
            className={styles[typeClassName]}
            modalRef={this.modalRef}
            modalTitle={modalTitle}
            content={children}
            onClose={this.closeModal}
            cancel={cancel}
            onTitleChange={(newTitle) => {
              this.setState({ modalTitle: newTitle });
            }}
          />
        )}
      </Fragment>
    );
  }
}

export default Modal;
