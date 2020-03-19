import React, { useState } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { useMutation } from '@apollo/react-hooks';

import TRANSLATE_ALBUM_MUTATION from 'Apollo/mutations/translateAlbum.gql';
import TRANSLATE_COMMENT_MUTATION from 'Apollo/mutations/translateComment.gql';
import TRANSLATE_MEDIA_MUTATION from 'Apollo/mutations/translateMedia.gql';
import TRANSLATE_USER_MUTATION from 'Apollo/mutations/translateUser.gql';
import { InlineSpinner } from 'Components/Widgets/Spinner';
import Translate from 'Hocs/Translate';

import messages from './messages';
import styles from './styles.scss';

export const translateButtonTypes = {
  ALBUM: 'album',
  COMMENT: 'comment',
  MEDIA: 'media',
  USER: 'user',
};

const translationMutations = {
  [translateButtonTypes.ALBUM]: TRANSLATE_ALBUM_MUTATION,
  [translateButtonTypes.COMMENT]: TRANSLATE_COMMENT_MUTATION,
  [translateButtonTypes.MEDIA]: TRANSLATE_MEDIA_MUTATION,
  [translateButtonTypes.USER]: TRANSLATE_USER_MUTATION,
};

const TranslateButtonRaw = ({ className, id, t, targetLocale, type }) => {
  const mutation = translationMutations[type];
  if (!mutation) {
    throw new Error(`Unsupported type '${type}'`);
  }
  const [translate] = useMutation(mutation, {});
  const [isTranslating, setIsTranslating] = useState(false);

  const classNames = classnames(styles.wrapper, className, { [styles.translating]: isTranslating });
  const onClick = async () => {
    setIsTranslating(true);
    try {
      const input = { itemId: id, locale: targetLocale };
      await translate({ variables: { input } });
    } catch (e) {
      console.error(e);
      setIsTranslating(false);
    }
  };

  if (isTranslating) {
    return <InlineSpinner className={classNames} />;
  }
  return (
    <button className={classNames} type="button" onClick={onClick}>
      {t('translate')}
    </button>
  );
};

TranslateButtonRaw.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string.isRequired,
  targetLocale: PropTypes.string.isRequired,
  t: PropTypes.func.isRequired,
  type: PropTypes.oneOf(Object.values(translateButtonTypes)).isRequired,
};

TranslateButtonRaw.defaultProps = {
  className: null,
};

export default Translate(messages)(TranslateButtonRaw);
