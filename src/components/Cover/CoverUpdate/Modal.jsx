import React from 'react';
import PropTypes from 'prop-types';

import styles from 'Components/Menu/styles.scss';
import { modalTypes } from 'Components/Modal';
import Translate from 'Hocs/Translate';
import WithModal from 'Hocs/WithModal';

import CoverUpdateForm from './Form';
import messages from '../messages';

const { STANDARD } = modalTypes;

const Modal = ({ t }) => {
  const menuEntryLabel = t('updateCoverMenuEntryLabel');
  const modalTitle = t('updateCoverModalTitle');
  const ariaLabel = t('updateCoverDialogLabel');

  const Content = WithModal({
    ariaLabel,
    modalContent: <CoverUpdateForm />,
    modalTitle,
    type: STANDARD,
  })(<div className={styles.menuEntry}>{menuEntryLabel}</div>);

  return <Content />;
};

Modal.propTypes = {
  t: PropTypes.func.isRequired,
};

export default Translate(messages)(Modal);
