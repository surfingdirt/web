import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { useMutation } from '@apollo/react-hooks';

import { extractErrorCode } from 'Apollo/exceptionParser';
import Button, { buttonTypes } from 'Components/Widgets/Button';
import menuStyles from 'Components/Widgets/Menu/styles.scss';
import { modalTypes } from 'Components/Widgets/Modal';
import Translate from 'Hocs/Translate';
import WithModal from 'Hocs/WithModal';
import { truncateItemTitleForConfirmation } from 'Utils/misc';

import messages from './messages';
import styles from './styles.scss';

const { MINIMAL } = modalTypes;
const { DESTRUCTIVE, MAIN } = buttonTypes;

const DeleteItemModal = ({ mutation, onError, t, title, update, variables }) => {
  const [deleteItem] = useMutation(mutation);
  const menuEntryLabel = t('deleteItemMenuEntryLabel');
  const modalTitle = t('deleteItemModalTitle');
  const ariaLabel = t('deleteItemDialogLabel');
  const message = t('quote').replace('%s', truncateItemTitleForConfirmation(title));

  const Content = ({ closeModal }) => {
    return (
      <Fragment>
        <p className={styles.message}>{message}</p>
        <div className={styles.buttons}>
          <Button label={t('cancelDelete')} type={MAIN} onClick={closeModal} />
          <Button
            label={t('confirmDelete')}
            type={DESTRUCTIVE}
            onClick={() => {
              // Note: no need to close the modal since it's attached to an element that will be deleted
              deleteItem({ update, variables }).catch((e) => {
                console.error('Could not delete item', { e, mutation, variables });
                closeModal();
                if (onError) {
                  onError(extractErrorCode(e));
                }
              });
            }}
          />
        </div>
      </Fragment>
    );
  };
  Content.propTypes = {
    closeModal: PropTypes.func,
  };
  Content.defaultProps = {
    closeModal: null,
  };

  const InnerModal = WithModal({
    ariaLabel,
    modalContent: <Content />,
    modalTitle,
    type: MINIMAL,
  })(<div className={menuStyles.menuEntry}>{menuEntryLabel}</div>);

  return <InnerModal />;
};

DeleteItemModal.propTypes = {
  onError: PropTypes.func,
  mutation: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  update: PropTypes.func,
  variables: PropTypes.shape({}).isRequired,
};

DeleteItemModal.defaultProps = {
  onError: null,
  update: null,
};

export default Translate(messages)(DeleteItemModal);
