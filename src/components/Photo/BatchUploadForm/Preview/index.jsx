import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import Translate from 'Hocs/Translate';
import icons, { getIcon, sizes } from 'Utils/icons';

import messages from './messages';
import styles from './styles.scss';

const Preview = ({
  onRemoveItemClick,
  t,
  uploading,
  item: { blob, error, name, width, height },
}) => {
  let content;
  if (uploading) {
    content = <p>Uploading...</p>;
  } else {
    content = (
      <Fragment>
        <button
          className={styles.removeButton}
          onClick={() => {
            onRemoveItemClick(name);
          }}
          alt={t('remove')}
        >
          {getIcon({ type: icons.CLOSE, size: sizes.SMALL })}
        </button>
        {error ? (
          <div className={styles.errorItem}>
            <p className={styles.error}>{t('imageError')}</p>
            <p>
              <span>{`${t('filename')}: `}</span>
              <span className={styles.filename}>{name}</span>
            </p>
          </div>
        ) : (
          <img
            title={name}
            alt={name}
            height={height}
            width={width}
            src={URL.createObjectURL(blob)}
          />
        )}
      </Fragment>
    );
  }

  return (
    <li className={styles.wrapper}>
      <div className={styles.positioner}>{content}</div>
    </li>
  );
};

Preview.propTypes = {
  onRemoveItemClick: PropTypes.func,
  t: PropTypes.func.isRequired,
  item: PropTypes.shape({
    blob: PropTypes.object,
    error: PropTypes.string,
    height: PropTypes.number,
    name: PropTypes.string.isRequired,
    width: PropTypes.number,
  }),
  uploading: PropTypes.bool,
};

Preview.defaultProps = {
  onRemoveItemClick: null,
  item: {
    blob: null,
    error: null,
    height: null,
    name: PropTypes.object.isRequired,
    width: null,
  },
  uploading: false,
};

export default Translate(messages)(Preview);
