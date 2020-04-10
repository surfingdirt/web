import PropTypes from 'prop-types';
import React from 'react';

import Paragraph from 'Components/Widgets/Paragraph';
import Translate from 'Hocs/Translate';

import messages from './messages';

const FeedHeader = ({ t }) => <Paragraph>{t('feedIntro')}</Paragraph>;

FeedHeader.propTypes = {
  t: PropTypes.func.isRequired,
};

export default Translate(messages)(FeedHeader);
