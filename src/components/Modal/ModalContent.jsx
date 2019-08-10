/* eslint-disable jsx-a11y/no-noninteractive-tabindex, jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/click-events-have-key-events */

import React from 'react';
import ReactDOM from 'react-dom';
import ReactFocusTrap from 'focus-trap-react';

import Button from 'Components/Button';
import Heading, {headingTypes} from 'Components/Heading';
import Translate from 'Hocs/Translate';
import icons, { getIcon, sizes } from 'Utils/icons';

import messages from './messages';
import styles from './styles.scss';

const { MODAL } = headingTypes;
const { CLOSE } = icons;
const { STANDARD } = sizes;

const ModalContent = ({
  ariaLabel,
  buttonRef,
  cancel,
  content,
  modalRef,
  modalTitle,
  onClickAway,
  onClose,
  t,
}) => {
  return ReactDOM.createPortal(
    <ReactFocusTrap
      focusTrapOptions={{
        initialFocus: modalTitle ? '#modal-title' : '#modal-content',
        onDeactivate: onClose,
      }}
    >
      <div
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        aria-modal="true"
        className={styles.cover}
        onClick={(e) => {
          if (e.target.classList.contains(styles.cover)) {
            onClickAway();
          }
        }}
        role="dialog"
      >
        <div className={styles.modal} ref={modalRef}>
          <div className={styles.header}>
            <div className={styles.title} id="modal-title" tabIndex={modalTitle ? '0' : ''}>
              <Heading type={MODAL} className={styles.heading}>{modalTitle}</Heading>
            </div>
            <button className={styles.close} onClick={onClose} ref={buttonRef} type="button">
              {getIcon({ type: CLOSE, label: t('labelClose'), size: STANDARD })}
            </button>
          </div>
          <div
            aria-label={ariaLabel}
            className={styles.content}
            id="modal-content"
            tabIndex={modalTitle ? '' : '0'}
          >
            {content}
          </div>
          {cancel && (
            <div className={styles.actions}>
              <Button label={t('labelCancel')} onClick={onClose} />
            </div>
          )}
        </div>
      </div>
    </ReactFocusTrap>,
    document.body,
  );
};

export default Translate(messages)(ModalContent);
