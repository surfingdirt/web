import React from 'react';
import PropTypes from 'prop-types';

import styles from 'Components/Menu/styles.scss';
import Translate from 'Hocs/Translate';
import WithModal from 'Hocs/WithModal';

import AvatarUpdateForm from './Form';
import messages from './messages';

const Modal = ({ t }) => {
  const menuEntryLabel = t('updateAvatarMenuEntryLabel');
  const modalTitle = t('updateAvatarModalTitle');
  const ariaLabel = t('updateAvatarDialogLabel');

  const Content = WithModal({
    modalContent: <AvatarUpdateForm />,
    modalTitle,
    ariaLabel,
    shouldShowModal: () => true,
  })(<div className={styles.menuEntry}>{menuEntryLabel}</div>);

  return <Content />;
};

Modal.propTypes = {
  t: PropTypes.func.isRequired,
};

export default Translate(messages)(Modal);
