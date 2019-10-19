import React from 'react';
import PropTypes from 'prop-types';

import NavigationLink from 'Components/NavigationLink';
import Translate from 'Hocs/Translate';
import icons from 'Utils/icons';
import routes from '~/routes';

import messages from './messages';

const { ALBUM } = icons;
const { ALBUMS } = routes;

const MoreAlbums = ({ t }) => (
  <NavigationLink to={ALBUMS} label={t('moreAlbums')} icon={ALBUM} negative />
);

MoreAlbums.propTypes = {
  t: PropTypes.func.isRequired,
};

export default Translate(messages)(MoreAlbums);
