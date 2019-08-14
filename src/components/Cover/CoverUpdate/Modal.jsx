import React from 'react';
import PropTypes from 'prop-types';

import styles from 'Components/Menu/styles.scss';
import Translate from 'Hocs/Translate';
import WithModal from 'Hocs/WithModal';

import CoverUpdateForm from './Form';
import messages from '../messages';

const Modal = ({ t }) => {
  const menuEntryLabel = t('updateCoverMenuEntryLabel');
  const modalTitle = t('updateCoverModalTitle');
  const ariaLabel = t('updateCoverDialogLabel');

  const Content = WithModal({
    modalContent: <CoverUpdateForm />,
    modalTitle,
    ariaLabel,
  })(<div className={styles.menuEntry}>{menuEntryLabel}</div>);

  return <Content />;
};

Modal.propTypes = {
  t: PropTypes.func.isRequired,
};

export default Translate(messages)(Modal);
