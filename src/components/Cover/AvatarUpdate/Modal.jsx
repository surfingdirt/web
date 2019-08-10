import React from 'react';
import PropTypes from 'prop-types';
import Translate from 'Hocs/Translate';
import WithModal from 'Hocs/WithModal';

import AvatarUpdateModal from './Form';
import messages from './messages';

const Modal = ({ t }) => {
  const menuEntryLabel = t('updateAvatarMenuEntryLabel');
  const modalTitle = t('updateAvatarModalTitle');
  const ariaLabel = t('updateAvatarDialogLabel');

  const Content = WithModal({
    modalContent: <AvatarUpdateModal />,
    modalTitle,
    ariaLabel,
    shouldShowModal: () => true,
  })(menuEntryLabel);

  return <Content />;
};

Modal.propTypes = {
  t: PropTypes.func.isRequired,
};

export default Translate(messages)(Modal);
