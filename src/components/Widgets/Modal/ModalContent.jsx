/* eslint-disable jsx-a11y/no-noninteractive-tabindex, jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/click-events-have-key-events */

import React from 'react';
import { createPortal } from 'react-dom';
import ReactFocusTrap from 'focus-trap-react';
import classnames from 'classnames';

import Button from 'Components/Widgets/Button';
import Heading, { headingTypes } from 'Components/Widgets/Heading';
import Translate from 'Hocs/Translate';
import icons, { getIcon } from 'Utils/icons';
import sizes from 'Utils/iconSizes';
import { ESC } from 'Utils/keycodes';

import messages from './messages';
import styles from './styles.scss';

const { MODAL } = headingTypes;
const { CLOSE } = icons;
const { STANDARD } = sizes;

const DIR = {
  LTR: 'ltr',
  RTL: 'rtl',
};

const ModalContent = ({
  ariaLabel,
  buttonRef,
  cancel,
  className,
  content,
  modalRef,
  modalTitle,
  onClickAway,
  onClose,
  onTitleChange,
  t,
}) => {
  const clonedContent = React.cloneElement(content, { onTitleChange });

  return createPortal(
    <ReactFocusTrap
      focusTrapOptions={{
        initialFocus: modalTitle ? '#modal-title' : '#modal-content',
        escapeDeactivates: false,
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
        <div
          className={classnames(styles.modal, className)}
          ref={modalRef}
          onKeyDown={(e) => {
            switch (e.keyCode) {
              case ESC:
                onClose();
                break;
              default:
                return;
            }

            e.preventDefault();
          }}
        >
          <div className={styles.header}>
            <div className={styles.titleWrapper} id="modal-title" tabIndex={modalTitle ? '0' : ''}>
              <Heading type={MODAL} className={styles.title}>
                {modalTitle}
              </Heading>
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
            {clonedContent}
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
