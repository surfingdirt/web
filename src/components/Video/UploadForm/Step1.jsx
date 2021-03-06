import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Field } from 'react-final-form';
import classnames from 'classnames';

import VideoEmbed from 'Components/Video/Embed';
import Button, { buttonTypes } from 'Components/Widgets/Button';
import InputField from 'Components/Widgets/Form/InputField';
import Translate from 'Hocs/Translate';
import icons, { getIcon } from 'Utils/icons';
import sizes from 'Utils/iconSizes';
import { buildEmbedUrl, extractKeyAndSubType } from 'Utils/video';

import messages from './messages';
import styles from './styles.scss';

const { ACTION } = buttonTypes;
const { STANDARD } = sizes;

const VIDEO_PREVIEW_WIDTH = 16;
const VIDEO_PREVIEW_HEIGHT = 9;

const Step1 = ({ t, onSubmit }) => {
  const [url, setUrl] = useState('');

  const validate = async (values) => {
    const errors = {};
    if (!values.url) {
      errors.url = t('required');
    } else {
      const { url: newUrl } = values;
      setUrl(newUrl);
      const { mediaSubType, vendorKey } = extractKeyAndSubType(newUrl);
      if (!mediaSubType || !vendorKey) {
        errors.url = t('notUnderstood');
      }
    }
    return errors;
  };

  const { mediaSubType, vendorKey } = extractKeyAndSubType(url);
  return (
    <Form
      onSubmit={onSubmit}
      validate={validate}
      render={({ handleSubmit, invalid, submitting }) => {
        let preview = null;
        if (mediaSubType && vendorKey) {
          const iframeUrl = buildEmbedUrl(mediaSubType, vendorKey);
          preview = (
            <VideoEmbed
              mediaSubType={mediaSubType}
              url={iframeUrl}
              height={VIDEO_PREVIEW_HEIGHT}
              width={VIDEO_PREVIEW_WIDTH}
            />
          );
        }

        return (
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={classnames(styles.preview, { [styles.empty]: !preview })}>
              {preview || (
                <div className={styles.content}>
                  {getIcon({ type: icons.VIDEO, size: STANDARD })}
                  <p>{t('pasteAbove')}</p>
                </div>
              )}
            </div>

            <Field
              name="url"
              id="url"
              component={InputField}
              type="text"
              label={t('url')}
              required
              autoComplete="new-password"
              placeholder={t('urlPlaceholder')}
            />

            <div className={styles.buttons}>
              <Button
                buttonType="submit"
                label={t('continue')}
                disabled={submitting || invalid}
                loading={submitting}
                type={ACTION}
              />
            </div>
          </form>
        );
      }}
    />
  );
};

Step1.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

export default Translate(messages)(Step1);
