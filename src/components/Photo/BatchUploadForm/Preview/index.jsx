import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Spinner from 'Components/Widgets/Spinner';
import Translate from 'Hocs/Translate';
import icons, { getIcon } from 'Utils/icons';
import sizes from 'Utils/iconSizes';

import {
  UPLOAD_STATE_INITIAL,
  UPLOAD_STATE_WAITING,
  UPLOAD_STATE_UPLOADING,
  UPLOAD_STATE_FINISHED,
  UPLOAD_STATE_ERROR,
} from '../uploadStates';
import messages from './messages';
import styles from './styles.scss';

const errorContent = (t, name) => {
  return (
    <div className={styles.errorItem}>
      <p>{t('imageError')}</p>
      <p>
        <span>{`${t('filename')}: `}</span>
        <span className={styles.filename}>{name}</span>
      </p>
    </div>
  );
};

const imageContent = (blob, height, name, width, className = null) => {
  return (
    <img
      className={className}
      title={name}
      alt={name}
      height={height}
      width={width}
      src={URL.createObjectURL(blob)}
    />
  );
};

const buttonContent = (name, onRemoveItemClick, t) => (
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
);

const Preview = ({
  onRemoveItemClick,
  t,
  item: { blob, error, link, name, state, width, height },
}) => {
  let content;

  switch (state) {
    case UPLOAD_STATE_INITIAL:
      content = (
        <Fragment>
          {buttonContent(name, onRemoveItemClick, t)}
          {error ? errorContent(t, name) : imageContent(blob, height, name, width)}
        </Fragment>
      );
      break;
    case UPLOAD_STATE_WAITING:
      content = (
        <Fragment>
          {imageContent(blob, height, name, width, styles.imgAsBackground)}
          <p className={styles.status}>{t('waiting')}</p>
        </Fragment>
      );
      break;
    case UPLOAD_STATE_UPLOADING:
      content = <Spinner className={styles.spinner} />;
      break;
    case UPLOAD_STATE_FINISHED:
      content = (
        <Fragment>
          {imageContent(blob, height, name, width, styles.imgAsBackground)}
          {getIcon({ type: icons.CHECK, size: sizes.STANDARD, className: styles.doneIcon })}
          <Link to={link} className={styles.doneContent} target="_blank">
            {t('open')}
            {getIcon({ type: icons.EXPAND, size: sizes.SMALL, className: styles.expandIcon })}
          </Link>
        </Fragment>
      );
      break;
    case UPLOAD_STATE_ERROR:
      content = <p className={styles.error}>{t('failed')}</p>;
      break;
    default:
      break;
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
    error: PropTypes.bool,
    height: PropTypes.number,
    link: PropTypes.string,
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
    link: null,
    name: PropTypes.object.isRequired,
    width: null,
  },
  uploading: false,
};

export default Translate(messages)(Preview);
