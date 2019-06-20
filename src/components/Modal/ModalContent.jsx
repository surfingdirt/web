/* eslint-disable jsx-a11y/no-noninteractive-tabindex, jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/click-events-have-key-events */

import Button from 'Components/Button';
import SVG from 'Components/SVG';
import ReactFocusTrap from 'focus-trap-react';
import Translate from 'Hocs/Translate';
import Close from 'Images/_old/close.svg';
import React from 'react';
import ReactDOM from 'react-dom';

import messages from './messages';
import styles from './styles.scss';

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
}) =>
  ReactDOM.createPortal(
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
              {modalTitle && modalTitle}
            </div>
            <div>
              <button className={styles.close} onClick={onClose} ref={buttonRef} type="button">
                <SVG className={styles.icon} icon={Close} label={t('labelClose')} />
              </button>
            </div>
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

export default Translate(messages)(ModalContent);
