import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Translate from 'Hocs/Translate/index';
import { userRoute } from 'Utils/links';
import { mediaSizes } from 'Utils/media';

import messages from './messages';
import styles from './styles.scss';

const { SMALL: smallMediaSize } = mediaSizes;

const SMALLEST = 'smallest';
const SMALL = 'small';
const STANDARD = 'standard';
export const userboxSizes = { SMALLEST, SMALL, STANDARD };

const sizeMapping = {
  [SMALLEST]: ['smallest'],
  [SMALL]: ['small'],
  [STANDARD]: ['standard'],
};

export const getInitialsData = (username) => {
  const initials = username
    .split(' ')
    .reduce((acc, word) => `${acc}${word[0]}`, '')
    .slice(0, 2);
  const color = username.split('').reduce((acc, letter) => acc + letter.charCodeAt(0), 0) % 360;
  const initialsColor = `hsl(${color},80%,60%)`;
  const bgColor = `hsl(${(color + 180) % 360},60%,60%)`;

  return {
    initials,
    color,
    initialsColor,
    bgColor,
  };
};

const UserboxRaw = (props) => {
  const {
    className,
    metadata,
    renderName,
    size,
    t,
    user: { username, userId, avatar },
  } = props;

  const sizeClassName = styles[sizeMapping[size]];

  const img = avatar && avatar.find((a) => a.size === smallMediaSize);
  const imgStyle = img ? { backgroundImage: `url(${img.url})` } : {};

  const { initials, initialsColor, bgColor } = getInitialsData(username);

  return (
    <Link
      to={userRoute(userId)}
      className={classnames(styles.wrapper, sizeClassName, className)}
      title={username}
    >
      <div className={classnames(styles.avatarWrapper)} aria-hidden="true">
        {avatar ? (
          <div className={styles.avatar} style={imgStyle} />
        ) : (
          <div className={styles.initialsWrapper}>
            <div
              className={styles.initials}
              style={{ color: initialsColor, backgroundColor: bgColor }}
            >
              {initials}
            </div>
          </div>
        )}
      </div>
      {renderName && <div className={styles.username}>{username}</div>}
    </Link>
  );
};

UserboxRaw.propTypes = {
  className: PropTypes.string,
  renderName: PropTypes.bool,
  size: PropTypes.string,
  t: PropTypes.func.isRequired,
  user: PropTypes.shape({
    avatar: PropTypes.shape(),
    username: PropTypes.string,
    userId: PropTypes.string,
    thumbs: PropTypes.arrayOf(),
  }).isRequired,
};

UserboxRaw.defaultProps = {
  className: null,
  renderName: true,
  size: STANDARD,
};

export default Translate(messages)(UserboxRaw);
