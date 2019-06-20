import Translate from 'Hocs/Translate';
import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';

import ActionLink from 'Components/ActionLink';
import icons from 'Utils/icons';
import routes from '~/routes';

import messages from './messages';
import styles from './styles.scss';

const { ALBUM_NEW, PHOTO_NEW, VIDEO_NEW } = routes;

const Actions = ({ className, t }) => {
  const items = [
    { to: ALBUM_NEW, icon: icons.ALBUM, label: t('createAnAlbum') },
    { to: PHOTO_NEW, icon: icons.PHOTO, label: t('postAPhoto') },
    { to: VIDEO_NEW, icon: icons.VIDEO, label: t('postAVideo') },
  ];
  return (
    <aside className={classnames(styles.wrapper, className)}>
      <ul className={styles.linkList}>
        {items.map((props) => (
          <li key={props.to}>
            <ActionLink {...props} />
          </li>
        ))}
      </ul>
    </aside>
  );
};

Actions.propTypes = {
  className: PropTypes.string.isRequired,
  t: PropTypes.func.isRequired,
};

export default Translate(messages)(Actions);
