import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import Translate from 'Hocs/Translate';
import icons, { getIcon, sizes } from 'Utils/icons';

import {
  UPLOAD_STATE_INITIAL,
  UPLOAD_STATE_WAITING,
  UPLOAD_STATE_UPLOADING,
  UPLOAD_STATE_FINISHED,
  UPLOAD_STATE_ERROR,
} from '../uploadStates';
import messages from './messages';
import styles from './styles.scss';

const Preview = ({ onRemoveItemClick, t, item: { blob, error, name, state, width, height } }) => {
  console.log('BatchUploadForm/Preview/index render');

  let content;

  switch (state) {
    case UPLOAD_STATE_INITIAL:
      content = (
        <Fragment>
          <button
            className={styles.removeButton}
            onClick={() => {
              onRemoveItemClick(name);
            }}
            alt={t('remove')}
            type="button"
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
      break;
    case UPLOAD_STATE_WAITING:
      content = <p>Waiting...</p>;
      break;
    case UPLOAD_STATE_UPLOADING:
      content = <p>Uploading...</p>;
      break;
    case UPLOAD_STATE_FINISHED:
      content = <p>Done</p>;
      break;
    case UPLOAD_STATE_ERROR:
      content = <p>Error</p>;
      break;
    default:
      break;
  }

  return (
    <li className={styles.wrapper}>
      <div style={{ position: 'absolute', zIndex: '2', top: 0, left: 0 }}>{`state: ${state}`}</div>
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
