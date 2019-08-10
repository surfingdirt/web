import React from 'react';
import PropTypes from 'prop-types';
import Translate from 'Hocs/Translate';
import WithModal from 'Hocs/WithModal';

import AvatarUpdateModal from './Form';
import messages from './messages';

const menuEntrylabel = 'Updateyo!';
const modalTitle = 'Update your avatar, yo!';
const ariaLabel = 'Update your avatar, yo!';

const Modal = WithModal({
  modalContent: <AvatarUpdateModal />,
  modalTitle,
  ariaLabel,
  shouldShowModal: () => true,
})(menuEntrylabel);

export default Modal;
