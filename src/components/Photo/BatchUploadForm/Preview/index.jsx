import React from 'react';
import PropTypes from 'prop-types';

import Translate from 'Hocs/Translate';
import icons, { getIcon, sizes } from 'Utils/icons';

import messages from './messages';
import styles from './styles.scss';

const Preview = ({ onRemoveItemClick, t, item: { blob, error, name, width, height } }) => {
  return (
    <li className={styles.wrapper}>
      <div className={styles.positioner}>
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
      </div>
    </li>
  );
};

Preview.propTypes = {
  onRemoveItemClick: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  item: {
    blob: PropTypes.object,
    error: PropTypes.string,
    height: PropTypes.number,
    name: PropTypes.string.isRequired,
    width: PropTypes.number,
  },
};

Preview.defaultProps = {
  item: {
    blob: null,
    error: null,
    height: null,
    name: PropTypes.object.isRequired,
    width: null,
  },
};

export default Translate(messages)(Preview);
