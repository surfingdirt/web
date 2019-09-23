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

const UserboxRaw = (props) => {
  const {
    className,
    size,
    t,
    user: { username, userId, avatar },
  } = props;

  const sizeClassName = styles[sizeMapping[size]];

  const img = avatar && avatar.find((a) => a.size === smallMediaSize);
  const imgStyle = img ? { backgroundImage: `url(${img.url})` } : {};

  const initials = username.split(' ').reduce((acc, word) => `${acc}${word[0]}`, '');
  const color = username.split('').reduce((acc, letter) => acc + letter.charCodeAt(0), 0) % 360;
  const initialsColor = `hsl(${color},60%,70%)`;
  const bgColor = `hsl(${(color + 180) % 360},60%,30%)`;

  return (
    <Link
      to={userRoute(userId)}
      className={classnames(styles.wrapper, sizeClassName)}
      title={username}
    >
      <div className={classnames(styles.avatarWrapper, className)} aria-hidden="true">
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
      <div className={styles.username}>{username}</div>
    </Link>
  );
};

UserboxRaw.propTypes = {
  className: PropTypes.string,
  size: PropTypes.string,
  t: PropTypes.func.isRequired,
  user: PropTypes.shape({
    username: PropTypes.string,
    userId: PropTypes.string,
    thumbs: PropTypes.arrayOf(),
  }).isRequired,
};

UserboxRaw.defaultProps = {
  className: null,
  size: STANDARD,
};

export default Translate(messages)(UserboxRaw);
