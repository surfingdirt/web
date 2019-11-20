import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { useMutation } from '@apollo/react-hooks';

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

const Modal = ({ mutation, t, title, update, variables }) => {
  const [deleteItem] = useMutation(mutation);

  const doDeleteItem = async () => {
    try {
      await deleteItem({ update, variables });
    } catch (e) {
      console.error('Could not delete item', { mutation, variables });
    }
  };

  const menuEntryLabel = t('deleteItemMenuEntryLabel');
  const modalTitle = t('deleteItemModalTitle');
  const ariaLabel = t('deleteItemDialogLabel');

  const message = t('quote').replace('%s', truncateItemTitleForConfirmation(title));

  const Content = ({ closeModal }) => (
    <Fragment>
      <p className={styles.message}>{message}</p>
      <div className={styles.buttons}>
        <Button label={t('cancelDelete')} type={MAIN} onClick={closeModal} />
        <Button
          label={t('confirmDelete')}
          type={DESTRUCTIVE}
          onClick={() => {
            doDeleteItem().then(closeModal);
          }}
        />
      </div>
    </Fragment>
  );

  Content.propTypes = {
    closeModal: PropTypes.func.isRequired,
  };

  const DeleteItemModal = WithModal({
    ariaLabel,
    modalContent: <Content />,
    modalTitle,
    type: MINIMAL,
  })(<div className={menuStyles.menuEntry}>{menuEntryLabel}</div>);

  return <DeleteItemModal />;
};

Modal.propTypes = {
  mutation: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  update: PropTypes.func,
  variables: PropTypes.shape({}).isRequired,
};

Modal.defaultProps = {
  update: null,
};

export default Translate(messages)(Modal);
